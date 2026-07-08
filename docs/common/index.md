# Common

Common application helpers for state, local-storage refs, forms, pagination, route checks, required refs, and i18n access. Most exports are Vue-focused today, but the package exists for shared application utilities that do not belong in lower-level `utils`.

All exports are named exports from the package root. Composables are small and predictable: they return refs and actions, but leave rendering, API fetching, and application-specific validation to the caller.

## Categories

- [Composables](./composables/useOpen) &mdash; reusable Vue state helpers such as `useOpen`, `useLoaded`, `useRouteParam`, and `useDataTable`.
- [Router](./router/isCurrentRoute) &mdash; helpers for comparing and grouping named Vue Router routes.
- [Refs](./refs/localStorageRef) &mdash; refs for local storage persistence and required initialization.
- [i18n](./i18n/translate) &mdash; module-level translation helpers backed by a registered i18n instance.

## Peer dependencies

- `vue` - required for refs, computed values, watchers, and lifecycle hooks.
- `vue-router` - required by route helpers.
- `vue-i18n` - optional; only needed when registering an i18n instance.

## Quick example

```ts
import { useLoaded, useOpen } from '@almighty-shogun/common'

const { isOpen, open, close } = useOpen();
const { isLoading, load } = useLoaded();

await load(() => fetch('/api/users'));
```

Continue with [installation](./installation) or jump to a category from the sidebar.
