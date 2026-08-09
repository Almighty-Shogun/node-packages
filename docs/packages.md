---
outline: deep
---

# Packages

Five packages, maintained in one Bun workspace and published independently. Each one covers a single concern, ships as ESM-only TypeScript, and is installed on its own. There is no meta-package that pulls the others in.

Only `@almighty-shogun/common` assumes a framework. The rest work in any TypeScript project that meets their runtime requirement.

## Foundations

Framework-agnostic building blocks. Everything else in the workspace is built on top of these.

- [Prototype Extensions](./prototype-extensions/) &mdash; side-effect methods on `Array`, `String`, and `Number`. Imported once at startup; it has no named runtime exports and no dependencies.
- [Utils](./utils/) &mdash; value guards, number and date formatting, locale metadata, serialization, control-flow wrappers, and small browser actions.

## Vue

- [Common](./common/) &mdash; composables for open state, loading, forms, pagination, data tables, hotkeys, clipboard, and persistence, plus Vue Router helpers, ref utilities, and module-level i18n access.

## Runtime integrations

Packages tied to one specific host runtime.

- [Bun Server](./bun-server/) &mdash; typed route definitions, route compilation, and response helpers around `Bun.serve()`.
- [WebKit Native Bridge](./webkit-native-bridge/) &mdash; typed request and command bridge for JavaScript embedded in a WebKit host application.

## How they fit together

`utils` sits underneath the three larger packages. `prototype-extensions` stands alone and is never imported by another package.

```text
prototype-extensions                       (standalone)

                 ┌──▶ common               (+ vue, vue-router)
utils ───────────┼──▶ bun-server           (+ Bun runtime)
                 └──▶ webkit-native-bridge (types only)
```

`bun-server` and `webkit-native-bridge` depend on `utils` for shared types such as [`Nullable`](./utils/types#nullable) and [`Undefinable`](./utils/types#undefinable). `webkit-native-bridge` uses them at type level only, so nothing from `utils` reaches its runtime bundle.

`common` is the only package that uses `utils` at runtime: composables such as [`useLocalStorage`](./common/composables/useLocalStorage) call [`serialize`](./utils/serialization/serialize) and [`deserialize`](./utils/serialization/deserialize), and [`useDarkTheme`](./common/composables/useDarkTheme) calls [`setDarkTheme`](./utils/browser-dom/setDarkTheme).

## Where to start

- **New here?** Read the [guide](./guide/) first, then install [Utils](./utils/installation).
- **Building a Vue application?** [Common](./common/installation) is the entry point, and it pulls in `utils` on its own. Add [Utils](./utils/installation) to your `package.json` too if your own code imports from it directly.
- **Only want formatting and value helpers?** [Utils](./utils/installation) on its own is enough.
- **Writing a Bun HTTP server?** Go straight to [Bun Server](./bun-server/installation).
- **Embedding a web UI in a native WebKit host?** Go straight to [WebKit Native Bridge](./webkit-native-bridge/installation).
