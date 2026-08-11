# Bun Server

Typed routing, server setup, and response helpers for Bun HTTP servers. The package is intended for Bun applications that want typed route definitions, predictable response helpers, and simple `Bun.serve()` integration without adopting a larger framework.

## Categories

- [Routing](./routing/compileRoutes) &mdash; [`defineRoute`](./routing/defineRoute) creates typed method route definitions, [`defineHtmlRoute`](./routing/defineHtmlRoute) registers Bun HTML imports, and [`compileRoutes`](./routing/compileRoutes) converts route collections into Bun routes.
- [Server](./server/createServer) &mdash; [`createServer`](./server/createServer) wraps `Bun.serve()` with defined routes by default, native Bun routes when requested, and default error handling.
- [Response](./responses/HttpResponse) &mdash; [`HttpResponse`](./responses/HttpResponse) adds a Bun `file()` factory to the shared [`@almighty-shogun/http-core`](../http-core/helpers/response) class, whose methods create responses for JSON, HTML, text, image, no-content, redirect, and common status responses such as not found and method not allowed.
- [Types](./types) &mdash; route, handler, and server option type helpers for Bun request handlers.
- [Errors](./errors) &mdash; the HTML route failures raised while compiling a route collection.

## Dependencies

- Bun runtime APIs &mdash; required for `Bun.serve()`, `BunRequest`, `Server`, `Bun.file()`, and HTML imports.
- [`@almighty-shogun/http-core`](../http-core/) &mdash; a direct dependency providing the HTTP vocabulary, the query helpers, the error classes, and the response class.
- [`@almighty-shogun/utils`](../utils/) &mdash; a direct dependency, used for shared utility types only and never at runtime.

This package is Bun-specific and does not run on Node.js or in the browser.

## Quick example

```ts
import { createServer, defineRoute } from '@almighty-shogun/bun-server';

const routes = {
    health: defineRoute('/health', 'GET', (_, response) => {
        return response.json({ ok: true });
    })
};

createServer({ port: 3000, routes });
```

Continue with [installation](./installation) or jump to a category from the sidebar.
