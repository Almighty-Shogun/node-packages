---
outline: deep

params:
    - name: collection
      description: Named collection of method route definitions, HTML route definitions, or arrays of route definitions.
      type: RouteCollection<WebSocketData>

    - name: options
      description: Route compilation behavior.
      type: CompileRoutesOptions
      defaultValue: '{}'

returns: A Bun-compatible route map keyed by route path.
---

# compileRoutes

Compiles a route collection into Bun routes. Method route definitions become Bun route handlers, while HTML route definitions become native Bun `HTMLBundle` route values. During compilation, it groups method definitions by path, rejects duplicate method/path pairs, rejects conflicting parameterized paths with the same shape, and adds automatic `HEAD` and `OPTIONS` behavior unless disabled.

When a route exists for a path but not for the request method, the compiled handler returns a `405 Method Not Allowed` response with an `Allow` header. `OPTIONS` responses return `204 No Content` with the same header.

Use `compileRoutes()` when you want route files to stay declarative but still need the native route object yourself. A route file can export a single `defineRoute()` result, a `defineHtmlRoute()` result, or an array of route definitions. The route barrel then re-exports those files, and `compileRoutes()` turns the imported collection into the object expected by `Bun.serve({ routes })`.

When you use `createServer()` with the default route mode, you can pass the same route collection directly and let `createServer()` call `compileRoutes()` for you.

## Importing

```ts
import { compileRoutes } from '@almighty-shogun/bun-server';
```

## Usage

For small servers, pass an object directly. Each property name is only used as the collection key; the route path and HTTP method come from the route definition itself.

```ts
import { compileRoutes, defineRoute, HttpMethod } from '@almighty-shogun/bun-server';

const routes = compileRoutes({
    health: defineRoute('/health', HttpMethod.Get, (_, response) => {
        return response.json({ ok: true });
    })
});

Bun.serve({
    routes
});
```

For larger servers, keep each route in `src/routes/*.ts`, export them from `src/routes/index.ts`, and pass the namespace import to `compileRoutes()`. This keeps the server entry point small while still making all registered routes explicit.

::: code-group

```ts [routes/app.ts]
import app from '../public/app.html';
import { defineHtmlRoute } from '@almighty-shogun/bun-server';

export default defineHtmlRoute(['/', '/dashboard'], app);
```

```ts [routes/users.ts]
import { defineRoute, HttpMethod } from '@almighty-shogun/bun-server';

export default defineRoute('/users', HttpMethod.Get, (_, response) => {
    return response.json([
        { id: 1, name: 'Shogun' }
    ]);
});
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

<FrontmatterDocs/>

## Type signature

```ts
declare function compileRoutes<WebSocketData = undefined>(
    collection: RouteCollection<WebSocketData>,
    options?: CompileRoutesOptions
): Record<string,
    | HTMLBundle
    | ((
        request: BunRequest<string>,
        server: Server<WebSocketData>
    ) => Response | Promise<Response>)
>;
```
