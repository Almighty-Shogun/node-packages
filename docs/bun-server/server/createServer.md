---
outline: deep

params:
    - name: options
      description: Bun serve options plus either a defined route collection or native Bun route map.
      type: CreateServerOptions<WebSocketData>

returns: The server instance returned by `Bun.serve()`.
---

# createServer

Creates a Bun HTTP server from either package route definitions or native Bun routes. By default, `createServer()` treats `options.routes` as a route collection created with `defineRoute()` and compiles it with `compileRoutes()` before passing it to `Bun.serve()`.

Set `routeMode: 'native'` when `routes` is already in Bun's own `Bun.serve({ routes })` format. Native mode bypasses `compileRoutes()`, so it does not add package behavior such as automatic `HEAD`, automatic `OPTIONS`, generated `405 Method Not Allowed` responses, or `Allow` headers.

The default error handler returns a response based on `defaultErrorResponse`: JSON, text, or an empty response body when set to `null`.

## Importing

```ts
import { createServer } from '@almighty-shogun/bun-server';
```

## Usage

Use defined routes for the package-managed route workflow. This is the default mode, so `routeMode` can be omitted.

```ts
import { createServer, defineRoute, HttpMethod } from '@almighty-shogun/bun-server';

const routes = {
    health: defineRoute('/health', HttpMethod.Get, (_, response) => {
        return response.json({ ok: true });
    })
};

const server = createServer({
    port: 3000,
    routes,
    defaultErrorResponse: 'json'
});

console.log(server.url);
```

Use native mode when you want to provide Bun route handlers yourself and only keep the `createServer()` wrapper around `Bun.serve()`.

```ts
import { createServer } from '@almighty-shogun/bun-server';

const server = createServer({
    port: 3000,
    routeMode: 'native',
    routes: {
        '/health': () => {
            return Response.json({ ok: true });
        }
    }
});

console.log(server.url);
```

<FrontmatterDocs/>

## Type signature

```ts
declare function createServer<WebSocketData = undefined>(
    options: CreateServerOptions<WebSocketData>
): ReturnType<typeof Bun.serve>;
```
