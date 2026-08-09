---
outline: deep

params:
    - name: options
      description: Bun serve options plus either a defined route collection or native Bun route map.
      type: CreateServerOptions<WebSocketData>

returns: The server instance returned by `Bun.serve()`.
---

# createServer

Creates a Bun HTTP server from either package route definitions or native Bun routes. By default, `createServer()` treats `options.routes` as a route collection created with [`defineRoute()`](../routing/defineRoute) and [`defineHtmlRoute()`](../routing/defineHtmlRoute), then compiles it with [`compileRoutes()`](../routing/compileRoutes) before passing it to `Bun.serve()`.

Set `routeMode: 'native'` when `routes` is already in Bun's own `Bun.serve({ routes })` format. Native mode bypasses [`compileRoutes()`](../routing/compileRoutes), so it does not add package behavior such as automatic `HEAD`, automatic `OPTIONS`, generated `405 Method Not Allowed` responses, or `Allow` headers.

When no `error` handler is supplied, `createServer()` installs one that reports uncaught errors as `500 Internal Server Error` using `defaultErrorResponse` for the body format: `'json'` produces `{ "status": 500, "error": "<message>" }`, `'text'` produces the message as plain text, and `null` produces an empty body. Passing your own `error` handler replaces this entirely, and `defaultErrorResponse` then only affects the `405` responses generated during route compilation.

Every other option is forwarded to `Bun.serve()` unchanged, so `port`, `hostname`, `tls`, `websocket`, and the rest behave exactly as they do natively.

## Importing

```ts
import { createServer } from '@almighty-shogun/bun-server';
```

## Usage

Use defined routes for the package-managed route workflow. This is the default mode, so `routeMode` can be omitted.

```ts
import { createServer, defineRoute } from '@almighty-shogun/bun-server';

const routes = {
    health: defineRoute('/health', 'GET', (_, response) => {
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

HTML route definitions can be mixed into the same route collection. This keeps React or other Bun-bundled frontends in the normal package workflow instead of requiring native route mode.

```ts
import app from './public/app.html';
import { createServer, defineHtmlRoute } from '@almighty-shogun/bun-server';

const routes = {
    app: defineHtmlRoute(['/', '/dashboard'], app)
};

const server = createServer({
    port: 3000,
    routes
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
