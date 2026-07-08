---
outline: deep
---

# Bun Server

`@almighty-shogun/bun-server` provides a small routing and response layer for Bun HTTP servers. It is intended for Bun applications that want typed route definitions, predictable response helpers, and simple `Bun.serve()` integration without adopting a larger framework.

The package includes:

- Routing &mdash; `defineRoute` creates typed route definitions and `compileRoutes` converts route collections into Bun route handlers.
- Server setup &mdash; `createServer` wraps `Bun.serve()` with compiled routes and default error handling.
- Responses &mdash; response classes and a `HttpResponse` factory for JSON, HTML, text, file, image, no-content, and common status responses.
- Types &mdash; HTTP method/status enums and route/server type helpers for Bun request handlers.

This package is Bun-specific. It depends on Bun's runtime APIs, including `Bun.serve()`, `BunRequest`, `Server`, and `Bun.file()`.
