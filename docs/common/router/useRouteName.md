---
outline: deep

returns: A computed route name, or `null` when the active route has no name.
---

# useRouteName

Reads the name of the active Vue Router route as a computed value. It tracks navigation, so a component that stays mounted across a route change still sees the current name.

Routes without a name resolve to `null` rather than an empty string, so a missing name is distinguishable from a name that happens to be empty and the usual `??` and `hasValue` handling applies.

Use [`useRouteNames`](./useRouteNames) when you need the whole matched chain rather than the leaf route, or [`useIsRoute`](./useIsRoute) to test against a specific name.

## Importing

```ts
import { useRouteName } from '@almighty-shogun/common';
```

## Usage

```ts
import { useRouteName } from '@almighty-shogun/common';

const routeName = useRouteName();

// routeName: 'users.index', or null for an unnamed route
```

<FrontmatterDocs/>

## Uses

- [Nullable](../../utils/types#nullable)

## Type signature

```ts
declare function useRouteName(): ComputedRef<Nullable<string>>;
```
