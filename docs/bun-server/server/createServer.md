---
outline: deep

params:
    - name: options
      description: Bun serve options plus either a defined route collection or native Bun route map.
      type: CreateServerOptions<WebSocketData>

returns: The server instance returned by `Bun.serve()`.
---

# createServer

Creates a Bun HTTP server from either package route definitions or native Bun routes. By default, `createServer()` treats `options.routes` as a route collection created with `defineRoute()` and `defineHtmlRoute()`, then compiles it with `compileRoutes()` before passing it to `Bun.serve()`.

Set `routeMode: 'native'` when `routes` is already in Bun's own `Bun.serve({ routes })` format. Native mode bypasses `compileRoutes()`, so it does not add package behavior such as automatic `HEAD`, automatic `OPTIONS`, generated `405 Method Not Allowed` responses, or `Allow` headers.

The default error handler uses `defaultErrorResponse` to decide how generated errors are returned. Set it to `'json'` for JSON, `'text'` for plain text, or `null` for an empty response body.

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
