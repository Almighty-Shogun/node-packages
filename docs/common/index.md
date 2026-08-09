# Common

Common application helpers for state, local-storage refs, forms, pagination, route data, DOM targets, keyboard shortcuts, and i18n access. Every export is Vue-focused today, including the i18n helpers, which read the current component instance. The package exists for shared application utilities that do not belong in lower-level `utils`.

All exports are named exports from the package root. Composables are small and predictable: they return refs and actions, but leave rendering, API fetching, and application-specific validation to the caller.

## Categories

- [Composables](./composables/useOpen) &mdash; reusable Vue state helpers such as [`useOpen`](./composables/useOpen), [`useLoaded`](./composables/useLoaded), [`useHotKey`](./composables/useHotKey), and [`useDataTable`](./composables/useDataTable).
- [Router](./router/useRouteParam) &mdash; helpers for reading route params and matching named Vue Router views.
- [Util](./util/requiredRef) &mdash; lower-level Vue ref and DOM target helpers.
- [i18n](./i18n/translate) &mdash; module-level translation helpers backed by a registered i18n instance.

## Dependencies

- [`@almighty-shogun/utils`](../utils/) &mdash; a direct dependency, used at runtime for serialization, value guards, and document helpers.
- `vue` &mdash; a peer dependency, required for refs, computed values, watchers, and lifecycle hooks.
- `vue-router` &mdash; a peer dependency, required by the route helpers.

The i18n helpers are not tied to a translation library and never import one. They pick up Vue I18n automatically through `$i18n` when it is installed, and otherwise use any object exposing `t`/`te` or `$t`/`$te` that you pass to [`registerI18n`](./i18n/registerI18n). Nothing extra is declared for them.

## Quick example

```ts
import { useLoaded, useOpen } from '@almighty-shogun/common';

const { isOpen, open, close } = useOpen();
const { isLoading, load } = useLoaded();

await load(() => fetch('/api/users'));
```

Continue with [installation](./installation) or jump to a category from the sidebar.
