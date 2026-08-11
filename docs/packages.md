---
outline: deep
---

# Packages

Seven packages, maintained in one Bun workspace. They share a version number and are published together, but each is installed on its own, covers a single concern, and ships as ESM-only TypeScript. There is no meta-package that pulls the others in, though a package brings its own dependencies with it: [`@almighty-shogun/common`](./common/) installs [`@almighty-shogun/utils`](./utils/), and the two server packages install [`@almighty-shogun/http-core`](./http-core/).

Only `common` assumes a framework. The rest work in any TypeScript project that meets their runtime requirement.

## Foundations

Framework-agnostic building blocks. Everything else in the workspace is built on top of these.

- [Prototype Extensions](./prototype-extensions/) &mdash; side-effect methods on `Array`, `String`, and `Number`. Imported once at startup; it has no named runtime exports and no dependencies.
- [Utils](./utils/) &mdash; value guards, number and date formatting, locale metadata, serialization, control-flow wrappers, and small browser actions.
- [HTTP Core](./http-core/) &mdash; HTTP method and status constants, the `HttpBaseResponse` class, query-string helpers, and the shared error classes. Rarely installed directly; the server packages pull it in and re-export all of it.

## Vue

- [Common](./common/) &mdash; composables for open state, loading, forms, pagination, data tables, hotkeys, clipboard, and persistence, plus Vue Router helpers, ref utilities, and module-level i18n access.

## Runtime integrations

Packages tied to one specific host runtime.

- [Bun Server](./bun-server/) &mdash; typed route definitions, route compilation, and response helpers around `Bun.serve()`.
- [Cloudflare Worker](./cloudflare-worker/) &mdash; typed route definitions with path parameters, worker module setup, and response helpers for the Workers runtime.
- [WebKit Native Bridge](./webkit-native-bridge/) &mdash; typed request and command bridge for JavaScript embedded in a WebKit host application.

## How they fit together

Arrows are workspace dependencies, and the note is what the package needs from outside the workspace.

```text
bun-server           ──► http-core ──► utils   (Bun-only)
cloudflare-worker    ──► http-core ──► utils   (Workers-only)
common               ──► utils                 (peer: vue, vue-router)
http-core            ──► utils                 (luxon)
prototype-extensions                           (standalone)
utils                                          (luxon)
webkit-native-bridge ──► utils                 (WebKit host)
```

Everything pointing at `utils` uses it for types alone, so nothing from it reaches those runtime bundles. `common` is the exception and calls into it at runtime. `@types/bun` and `@cloudflare/workers-types` are optional peer dependencies, needed only to type-check against the runtime globals the two server packages reference.

[`@almighty-shogun/prototype-extensions`](./prototype-extensions/) is never imported by another package. It is a side-effect import your application makes once at startup.

What the other packages take from `utils` is the [shared type vocabulary](./utils/types), [`Nullable`](./utils/types#nullable) and [`Undefinable`](./utils/types#undefinable) among them. `common` takes more than types: composables such as [`useLocalStorage`](./common/composables/useLocalStorage) use [`serialize`](./utils/serialization/serialize) and [`deserialize`](./utils/serialization/deserialize), and [`useDarkTheme`](./common/composables/useDarkTheme) uses [`setDarkTheme`](./utils/browser-dom/setDarkTheme).

`http-core` is the layer between `utils` and the server packages. It owns the HTTP vocabulary, the [`HttpBaseResponse`](./http-core/helpers/response) class, the [query helpers](./http-core/helpers/requests), and the [error classes](./http-core/errors), so a status code, a JSON response, or a thrown error has one definition across every runtime. Adding a runtime package means adding a line to the diagram above, not a new set of response and error types.

Both server packages re-export **every** `http-core` export from their own root, so an application installs one package and imports everything from it. `http-core` is published and documented for the rarer case of building your own server wrapper.

Luxon is the only third-party runtime dependency in the workspace, and it reaches a bundle only through the code that uses it: in `utils` the [date helpers](./utils/date-time/formatDate), [`serialize`](./utils/serialization/serialize), [`deserialize`](./utils/serialization/deserialize), and [`disableZoom`](./utils/browser-dom/disableZoom), and in `http-core` only [`queryDate`](./http-core/helpers/requests#querydate). Both packages are side-effect free, so a build that never calls those drops Luxon entirely.

## Where to start

- **New here?** Read the [guide](./guide/) first, then install [Utils](./utils/installation).
- **Building a Vue application?** [Common](./common/installation) is where most Vue and Vite applications start.
- **Only want formatting and value helpers?** [Utils](./utils/installation) on its own is enough.
- **Writing your own server wrapper?** [HTTP Core](./http-core/installation) gives you the status vocabulary and response class without a runtime attached.
- **Writing a Bun HTTP server?** Go straight to [Bun Server](./bun-server/installation).
- **Deploying to Cloudflare?** Go straight to [Cloudflare Worker](./cloudflare-worker/installation).
- **Embedding a web UI in a native WebKit host?** Go straight to [WebKit Native Bridge](./webkit-native-bridge/installation).
