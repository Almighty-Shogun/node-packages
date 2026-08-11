---
outline: deep
---

# Types

Shared TypeScript types exported by `@almighty-shogun/bun-server`.

Some signatures reuse utility types from [`@almighty-shogun/utils`](../utils/types): [`Arrayable`](../utils/types#arrayable), [`Promisable`](../utils/types#promisable), and [`Undefinable`](../utils/types#undefinable).

Types re-exported from [`@almighty-shogun/http-core`](../http-core/) are documented on its own [types page](../http-core/types) rather than repeated below. That includes [`HttpBaseResponse`](../http-core/helpers/response), the class [`HttpResponse`](./responses/HttpResponse) extends and the type a handler returns.

## RouteHandler

Function shape used by [`defineRoute()`](./routing/defineRoute). A route handler receives Bun's typed request, the [`HttpResponse`](./responses/HttpResponse) class with its static factory methods, and the active Bun server, then returns a response synchronously or asynchronously.

The two response types in the signature are related, not interchangeable. The `response` argument is [`HttpResponse`](./responses/HttpResponse), this package's class, so it offers `file()` on top of the shared factories. The return type is [`HttpBaseResponse`](../http-core/helpers/response), the class it extends, which is what every factory produces, so a handler can return the result of any of them.

```ts
import type { HttpBaseResponse } from '@almighty-shogun/http-core';

type RouteHandler<
    Path extends string = string,
    WebSocketData = undefined
> = (
    request: BunRequest<Path>,
    response: typeof HttpResponse,
    server: Server<WebSocketData>
) => Promisable<HttpBaseResponse>;
```

## RouteDefinition

Represents one route path, HTTP method, and handler pair. [`defineRoute()`](./routing/defineRoute) returns this shape and freezes it at runtime so route collections behave like static configuration.

```ts
type RouteDefinition<
    Path extends string = string,
    Method extends HttpMethod = HttpMethod,
    WebSocketData = undefined
> = {
    readonly path: Path;
    readonly method: Method;
    readonly handler: RouteHandler<Path, WebSocketData>;
};
```

## HtmlRouteDefinition

Represents one Bun HTML import and the route path, or route paths, that should serve it. [`defineHtmlRoute()`](./routing/defineHtmlRoute) returns this shape so HTML bundles can be included in the same route collection as method routes.

The `path` property accepts an array for single-page applications or React frontends that should be served from multiple entry URLs while client-side routing handles the rest.
It is modeled with [`Arrayable`](../utils/types#arrayable) so callers can pass one path or a path array.

```ts
type HtmlRouteDefinition<Path extends string = string> = {
    readonly path: Arrayable<Path>;
    readonly bundle: HTMLBundle;
};
```

## RouteExport

Single value that can be exported from a route barrel consumed by [`compileRoutes()`](./routing/compileRoutes) or [`createServer()`](./server/createServer) in defined route mode. It accepts one method route definition, one HTML route definition, or an array of route definitions.

Use an array when one route file should expose multiple method definitions for the same resource. Use [`HtmlRouteDefinition.path`](./types#htmlroutedefinition) as an array when one HTML bundle should be served from multiple URLs.

```ts
type RouteExport<WebSocketData = undefined> = Arrayable<
    | RouteDefinition<any, HttpMethod, WebSocketData>
    | HtmlRouteDefinition<any>
>;
```

## RouteCollection

Named route map accepted by [`compileRoutes()`](./routing/compileRoutes) and by [`createServer()`](./server/createServer) when `routeMode` is omitted or set to `'defined'`. Each key can point to a method route definition, an HTML route definition, or an array of route definitions.

This type is intentionally based on [`RouteExport`](./types#routeexport) instead of a fixed `RouteDefinition<string, ...>` shape, so namespace imports from a route barrel can be passed directly.

```ts
type RouteCollection<
    WebSocketData = undefined
> = Record<string, RouteExport<WebSocketData>>;
```

That is what lets a whole route barrel be handed to the server in one go:

```ts
import * as routes from './routes';
import { createServer } from '@almighty-shogun/bun-server';

createServer({ routes });
```

## CompileRoutesOptions

Configures route compilation behavior. Automatic `HEAD` mirrors `GET` responses without a body, automatic `OPTIONS` returns `204 No Content` with an `Allow` header, and `defaultErrorResponse` controls generated error body format.

```ts
type CompileRoutesOptions = {
    automaticHead?: Undefinable<boolean>;
    automaticOptions?: Undefinable<boolean>;
    defaultErrorResponse?: Undefinable<DefaultErrorResponse>;
};
```

## NativeRouteCollection

Native Bun route map accepted by [`createServer()`](./server/createServer) when `routeMode` is set to `'native'`. Use this when you already have handlers in Bun's `Bun.serve({ routes })` format and do not want [`createServer()`](./server/createServer) to run [`compileRoutes()`](./routing/compileRoutes).

```ts
type NativeRouteCollection<
    WebSocketData = undefined
> = NonNullable<BunServeOptions<WebSocketData>['routes']>;
```

## CreateServerDefinedOptions

Options for the default [`createServer()`](./server/createServer) route mode. `routes` is a package route collection and is compiled with [`compileRoutes()`](./routing/compileRoutes) before the server is created.

Both server option types extend the same internal base, which is every `Bun.serve()` option except `routes`, plus [`defaultErrorResponse`](../http-core/types#defaulterrorresponse):

```ts
type CreateServerBaseOptions<WebSocketData = undefined> = Omit<
    BunServeOptions<WebSocketData>,
    'routes'
> & {
    defaultErrorResponse?: Undefinable<DefaultErrorResponse>;
};
```

The defined mode then adds the package route collection and its compilation options:

```ts
type CreateServerDefinedOptions<
    WebSocketData = undefined
> = CreateServerBaseOptions<WebSocketData> & {
    routeMode?: Undefinable<'defined'>;
    routes: RouteCollection<WebSocketData>;
    automaticHead?: Undefinable<boolean>;
    automaticOptions?: Undefinable<boolean>;
};
```

## CreateServerNativeOptions

Options for native route mode. `routes` must already be in Bun's native route format and is passed through without package route compilation. Compilation-only options such as `automaticHead` and `automaticOptions` are not accepted in this mode.

```ts
type CreateServerNativeOptions<
    WebSocketData = undefined
> = CreateServerBaseOptions<WebSocketData> & {
    routeMode: 'native';
    routes: NativeRouteCollection<WebSocketData>;
    automaticHead?: never;
    automaticOptions?: never;
};
```

## CreateServerOptions

Union of the two supported [`createServer()`](./server/createServer) route modes. Omit `routeMode` for the package's defined route workflow, or set `routeMode: 'native'` when you want to provide Bun route handlers yourself.

```ts
type CreateServerOptions<WebSocketData = undefined> =
    | CreateServerDefinedOptions<WebSocketData>
    | CreateServerNativeOptions<WebSocketData>;
```
