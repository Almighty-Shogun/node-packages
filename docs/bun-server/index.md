---
outline: deep
---

# Bun Server

`@almighty-shogun/bun-server` provides a small routing and response layer for Bun HTTP servers. It is intended for Bun applications that want typed route definitions, predictable response helpers, and simple `Bun.serve()` integration without adopting a larger framework.

The package includes:

- Routing &mdash; `defineRoute` creates typed method route definitions, `defineHtmlRoute` registers Bun HTML imports, and `compileRoutes` converts route collections into Bun routes.
- Server setup &mdash; `createServer` wraps `Bun.serve()` with defined routes by default, native Bun routes when requested, and default error handling.
- Responses &mdash; response classes and a `HttpResponse` factory for JSON, HTML, text, file, image, no-content, redirect, and common status responses such as not found and method not allowed.
- Types &mdash; HTTP method/status enums and route/server type helpers for Bun request handlers.

This package is Bun-specific. It depends on Bun's runtime APIs, including `Bun.serve()`, `BunRequest`, `Server`, `Bun.file()`, and Bun HTML imports.
