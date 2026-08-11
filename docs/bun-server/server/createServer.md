---
outline: deep

params:
    - name: options
      description: Bun serve options plus either a defined route collection or native Bun route map.
      type: CreateServerOptions<WebSocketData>

returns: The server instance returned by `Bun.serve()`.
---

# createServer

Creates a Bun HTTP server from a route collection. It compiles `options.routes` with [`compileRoutes()`](../routing/compileRoutes) before handing them to `Bun.serve()`, and forwards every other option unchanged, so `port`, `hostname`, `tls`, `websocket`, and the rest behave exactly as they do natively.

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
import {
    createServer,
    defineHtmlRoute
} from '@almighty-shogun/bun-server';

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

## Route modes

By default `options.routes` is a route collection built with [`defineRoute()`](../routing/defineRoute) and [`defineHtmlRoute()`](../routing/defineHtmlRoute).

Set `routeMode: 'native'` when `routes` is already in Bun's own `Bun.serve({ routes })` format. Native mode bypasses [`compileRoutes()`](../routing/compileRoutes), so it adds none of the package behavior: no automatic `HEAD`, no automatic `OPTIONS`, no generated `405 Method Not Allowed` responses, and no `Allow` headers.

## Error handling

With no `error` handler supplied, uncaught errors are reported as `500 Internal Server Error` in the format `defaultErrorResponse` selects: `'json'` produces `{ "status": 500, "error": "<message>" }`, `'text'` produces the message as plain text, and `null` produces an empty body.

Passing your own `error` handler replaces that entirely, and `defaultErrorResponse` then only affects the `405` responses generated during route compilation.

<FrontmatterDocs/>

## Type signature

```ts
declare function createServer<WebSocketData = undefined>(
    options: CreateServerOptions<WebSocketData>
): ReturnType<typeof Bun.serve>;
```
