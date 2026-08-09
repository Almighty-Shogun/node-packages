---
outline: deep

returns: A computed list of the names of all matched route records.
---

# useRouteNames

Returns the names of all matched Vue Router route records for the current route. It is useful for layouts where a parent route name should activate navigation, breadcrumbs, or view-specific UI.

Only matched records with a non-empty route name are included. The returned value updates with the active route.

## Importing

```ts
import { useRouteNames } from '@almighty-shogun/common';
```

## Usage

```ts
import { computed } from 'vue';
import { useRouteNames } from '@almighty-shogun/common';

const routeNames = useRouteNames();
const inSettings = computed(() => routeNames.value.includes('settings'));
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useRouteNames(): ComputedRef<string[]>;
```
