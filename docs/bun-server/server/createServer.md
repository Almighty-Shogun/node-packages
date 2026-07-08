---
outline: deep

params:
    - name: options
      description: Bun serve options plus a public route collection and route compilation options.
      type: CreateServerOptions<WebSocketData>

returns: The server instance returned by `Bun.serve()`.
---

# createServer

Creates a Bun HTTP server from a route collection. It compiles `options.routes` with `compileRoutes()`, passes the remaining options to `Bun.serve()`, and installs a default error handler when no custom `error` handler is provided.

The default error handler returns a response based on `defaultErrorResponse`: JSON, text, or an empty response body when set to `null`.

## Importing

```ts
import { createServer } from '@almighty-shogun/bun-server';
```

## Usage

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

<FrontmatterDocs/>

## Type signature

```ts
declare function createServer<WebSocketData = undefined>(
    options: CreateServerOptions<WebSocketData>
): ReturnType<typeof Bun.serve>;
```
