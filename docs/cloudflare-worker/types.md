---
outline: deep
---

# Types

Shared TypeScript types exported by `@almighty-shogun/cloudflare-worker`.

Some signatures reuse utility types from [`@almighty-shogun/utils`](../utils/types): [`Arrayable`](../utils/types#arrayable), [`Nullable`](../utils/types#nullable), [`Promisable`](../utils/types#promisable), and [`Undefinable`](../utils/types#undefinable).

Types re-exported from [`@almighty-shogun/http-core`](../http-core/) are documented on its own [types page](../http-core/types) rather than repeated below.

## WorkerEnv

The Cloudflare bindings and secrets your worker runs with. The package ships it empty and hands it to handlers as their trailing argument, so declaring it once types `env` everywhere.

```ts
interface WorkerEnv {}
```

Augment it from any file the compiler includes:

```ts
import type { Undefinable } from '@almighty-shogun/utils';

declare module '@almighty-shogun/cloudflare-worker' {
    interface WorkerEnv {
        CACHE: KVNamespace;
        ASSETS: Fetcher;
        SENTRY_DSN: Undefinable<string>;
    }
}
```

::: warning
The file must be a module, so it needs a top-level `import` or `export`. Without one, TypeScript reads `declare module` as an ambient declaration that replaces the package's types instead of merging into them, and every import from it silently resolves to `any`.
:::

Until it is augmented the interface is empty, so reading any binding is a compile error and the `assets` option of [`createWorker()`](./worker/createWorker) accepts nothing.

## RouteRequest

The first argument a route handler receives. It is the native `Request` with the decoded path parameters and the worker's `ExecutionContext` attached, so standard members such as `headers`, `method`, and `url` are all present.

The parsed URL is not attached, because `Request.url` is already a standard string property. Handlers that need query parameters build their own `new URL(request.url)`.

```ts
type RouteRequest<Path extends string = string> = Request & {
    readonly params: RouteParams<Path>;
    readonly ctx: ExecutionContext;
};
```

## RouteHandler

The function a route runs. It receives the [`RouteRequest`](#routerequest), the [`HttpResponse`](./responses/HttpResponse) class itself, and the environment, and must resolve to an `HttpResponse` instance. Returning anything else throws at dispatch time.

Bindings arrive as the third argument rather than on the request, so a route that never reads one takes two parameters and cannot see the environment at all.

```ts
type RouteHandler<Path extends string = string> = (
    request: RouteRequest<Path>,
    response: typeof HttpResponse,
    env: WorkerEnv
) => Promisable<HttpBaseResponse>;
```

## RouteDefinition

A single path and method pairing produced by [`defineRoute()`](./routing/defineRoute). The object is frozen at creation.

```ts
type RouteDefinition<
    Path extends string = string,
    Method extends HttpMethod = HttpMethod
> = {
    readonly path: Path;
    readonly method: Method;
    readonly handler: RouteHandler<Path>;
};
```

## RouteExport

One export from a routes module, which may be a single definition or an array of them.

```ts
type RouteExport = Arrayable<RouteDefinition<any, HttpMethod>>;
```

## RouteCollection

An object of route exports, normally produced by a namespace import of a routes barrel. Keys are read in alphabetical order while compiling, so the result does not depend on module evaluation order.

```ts
type RouteCollection = Record<string, RouteExport>;
```

## CompiledRoute

One path after compilation, holding its split segments and every method registered for it. Produced by [`compileRoutes()`](./routing/compileRoutes).

```ts
type CompiledRoute = {
    readonly path: string;
    readonly segments: readonly string[];
    readonly methods: ReadonlyMap<HttpMethod, RouteHandler>;
};
```

## CompiledRouteCollection

The full compiled route list, ordered so that static segments are matched before parameter segments.

```ts
type CompiledRouteCollection = readonly CompiledRoute[];
```

## AssetsBinding

The minimum shape the worker needs from a static assets binding. Cloudflare's `Fetcher` satisfies it.

```ts
type AssetsBinding = {
    fetch(request: Request): Promise<Response>;
};
```

## WorkerErrorHandler

Called with anything a route handler throws. Return an [`HttpResponse`](./responses/HttpResponse) to send it instead of the generated error, or `null` to fall through to the default response.

```ts
type WorkerErrorHandler = (
    error: unknown,
    request: Request,
    env: WorkerEnv
) => Promisable<Nullable<HttpBaseResponse>>;
```

## ScheduledRun

The first argument a scheduled handler receives, describing the trigger that fired. `cron` is the expression Cloudflare matched, repeated from `controller.cron` for convenience.

```ts
type ScheduledRun = {
    readonly controller: ScheduledController;
    readonly ctx: ExecutionContext;
    readonly cron: string;
};
```

## ScheduledHandler

The function a scheduled task runs. Like a route handler, it takes the environment as a separate trailing argument, so a task that needs no binding takes one parameter or none.

```ts
type ScheduledHandler = (
    run: ScheduledRun,
    env: WorkerEnv
) => Promisable<void>;
```

## ScheduledDefinition

A single cron expression and handler pairing produced by [`defineScheduled()`](./scheduling/defineScheduled). The object is frozen at creation.

```ts
type ScheduledDefinition<Cron extends string = string> = {
    readonly cron: Cron;
    readonly handler: ScheduledHandler;
};
```

## ScheduledExport

One export from a scheduled module, which may be a single definition or an array of them.

```ts
type ScheduledExport = Arrayable<ScheduledDefinition<any>>;
```

## ScheduledCollection

An object of scheduled exports, normally produced by a namespace import of a tasks barrel. Keys are read in alphabetical order while compiling, so handler order does not depend on module evaluation order.

```ts
type ScheduledCollection = Record<string, ScheduledExport>;
```

## CompiledScheduled

One cron expression after compilation, carrying every handler registered for it in the order they were collected. Produced by [`compileScheduled()`](./scheduling/compileScheduled).

```ts
type CompiledScheduled = {
    readonly cron: string;
    readonly handlers: readonly ScheduledHandler[];
};
```

## CompiledScheduledCollection

The full compiled task list, sorted by cron expression.

```ts
type CompiledScheduledCollection = readonly CompiledScheduled[];
```

## CreateWorkerOptions

Configuration accepted by [`createWorker()`](./worker/createWorker). Only `routes` is required; `automaticHead` and `automaticOptions` default to `true`, and `defaultErrorResponse` defaults to `null`. `scheduled` takes a whole collection rather than one function, so several tasks can share a cron expression.

```ts
type CreateWorkerOptions = {
    routes: RouteCollection;
    assets?: Undefinable<EnvAssetsBinding>;
    scheduled?: Undefinable<ScheduledCollection>;
    automaticHead?: Undefinable<boolean>;
    automaticOptions?: Undefinable<boolean>;
    defaultErrorResponse?: Undefinable<DefaultErrorResponse>;
    onError?: Undefinable<WorkerErrorHandler>;
};
```

## WorkerModule

The module object Cloudflare calls into, returned by [`createWorker()`](./worker/createWorker) and meant to be the entry file's default export. `scheduled` is always present, even when no scheduled handler was configured.

```ts
type WorkerModule = {
    fetch(
        request: Request,
        env: WorkerEnv,
        ctx: ExecutionContext
    ): Promise<Response>;

    scheduled(
        controller: ScheduledController,
        env: WorkerEnv,
        ctx: ExecutionContext
    ): Promise<void>;
};
```
