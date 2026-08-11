---
outline: deep

params:
    - name: collection
      description: Named collection of method route definitions, HTML route definitions, or arrays of route definitions.
      type: RouteCollection<WebSocketData>

    - name: options
      description: Route compilation behavior.
      type: CompileRoutesOptions
      optional: true
      defaultValue: '{}'

returns: A Bun-compatible route map keyed by route path.
---

# compileRoutes

Compiles a route collection into the route object `Bun.serve()` expects, turning method definitions into route handlers and HTML definitions into native `HTMLBundle` values. [`createServer()`](../server/createServer) calls it for you in the default route mode, so reach for it directly only when you want the native object yourself.

## Importing

```ts
import { compileRoutes } from '@almighty-shogun/bun-server';
```

## Usage

For small servers, pass an object directly. Each property name is only used as the collection key; the route path and HTTP method come from the route definition itself.

```ts
import { compileRoutes, defineRoute } from '@almighty-shogun/bun-server';

const routes = compileRoutes({
    health: defineRoute('/health', 'GET', (_, response) => {
        return response.json({ ok: true });
    })
});

Bun.serve({
    routes
});
```

## Route files

A route file can export a single [`defineRoute()`](./defineRoute) result, a [`defineHtmlRoute()`](./defineHtmlRoute) result, or an array of definitions. Keep each in `src/routes/*.ts`, export them from `src/routes/index.ts`, and pass the namespace import to `compileRoutes()`. This keeps the server entry point small while still making all registered routes explicit.

::: code-group

```ts [routes/app.ts]
import app from '../public/app.html';
import { defineHtmlRoute } from '@almighty-shogun/bun-server';

export default defineHtmlRoute(['/', '/dashboard'], app);
```

```ts [routes/users.ts]
import { defineRoute, HttpMethod } from '@almighty-shogun/bun-server';

export default [
    defineRoute('/users', HttpMethod.Get, (_, response) => {
        return response.json([
            { id: 1, name: 'Shogun' }
        ]);
    }),

    defineRoute('/users/:id', HttpMethod.Get, (request, response) => {
        return response.json({ id: request.params.id });
    }),

    defineRoute('/users', HttpMethod.Post, async (request, response) => {
        return response.created(JSON.stringify(await request.json()), {
            contentType: 'application/json; charset=utf-8'
        });
    })
];
```

```ts [routes/index.ts]
export { default as app } from './app';
export { default as users } from './users';
```

```ts [server.ts]
import * as routes from './routes';
import { compileRoutes } from '@almighty-shogun/bun-server';

Bun.serve({
    routes: compileRoutes(routes)
});
```

:::

::: tip
A route file can also export an array when one path has multiple supported methods. `compileRoutes()` flattens those arrays, registers every method route definition, and still handles unsupported methods with the correct `Allow` header. HTML routes can use a path array when one bundle should be served from multiple paths.
:::

## Automatic methods

Method definitions are grouped by path, so one path carries every method registered for it. Unless disabled, `HEAD` is answered from the matching `GET` handler and `OPTIONS` is answered automatically.

When a path exists but the request method does not, the compiled handler returns `405 Method Not Allowed` with an `Allow` header. `OPTIONS` responses return `204 No Content` with the same header.

## Validation

Compilation is strict and throws rather than silently dropping a route. It rejects:

- a collection that is not an object
- a collection that exports nothing
- an export whose array is empty
- a duplicate `method` and `path` pair
- a path registered as both an HTML route and a method route
- two paths that differ only in parameter name, such as `/users/:id` and `/users/:userId`

At request time, a handler that returns anything other than an [`HttpResponse`](../responses/HttpResponse) throws a `TypeError` naming the offending method and path.

<FrontmatterDocs/>

## Uses

- [Promisable](../../utils/types#promisable)

## Type signature

```ts
declare function compileRoutes<WebSocketData = undefined>(
    collection: RouteCollection<WebSocketData>,
    options?: CompileRoutesOptions
): CompiledRouteCollection<WebSocketData>;

type CompiledRouteCollection<WebSocketData = undefined>
    = Record<string, HTMLBundle | CompiledRouteHandler<WebSocketData>>;
```
