---
outline: deep

params:
    - name: route
      description: Route name to look for among the matched route names.
      type: string

    - name: strict
      description: Require an exact name match. Set to `false` to match on prefix instead.
      type: boolean
      optional: true
      defaultValue: 'true'

returns: A computed boolean that is `true` when the current route matches.
---

# useIsRoute

Checks whether a route name is among the currently matched route records. Vue Router keeps every ancestor matched while a child renders, so a parent's name still reports `true` from inside its children.

Names are compared exactly, so `useIsRoute('settings')` only matches a record actually named `settings`. Pass `false` for `strict` to compare by prefix instead, which also matches an unrelated `settings-billing`.

## Importing

```ts
import { useIsRoute } from '@almighty-shogun/common';
```

## Usage

```ts
import { useIsRoute } from '@almighty-shogun/common';

const isSettings = useIsRoute('settings');
const isAnySetting = useIsRoute('settings.', false);
```

<FrontmatterDocs/>

## Uses

- [useRouteNames](./useRouteNames)

## Type signature

```ts
declare function useIsRoute(
    route: string,
    strict?: boolean
): ComputedRef<boolean>;
```
