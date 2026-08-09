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

# useIsCurrentRoute

Checks whether the active Vue Router route matches a given name. It reads every matched route name, so a parent name still matches while a child route is rendered, which is what active navigation states usually want.

Matching is exact by default: `useIsCurrentRoute('settings')` is `true` on `settings` and on `settings.profile` because both appear in the matched chain, but never on `settings-billing`.

Pass `false` for `strict` to match on prefix instead. That is looser and catches unrelated names that happen to share a beginning, so reach for it only when route names are deliberately namespaced by prefix.

## Importing

```ts
import { useIsCurrentRoute } from '@almighty-shogun/common';
```

## Usage

```ts
import { useIsCurrentRoute } from '@almighty-shogun/common';

const isSettings = useIsCurrentRoute('settings');
const isAnySetting = useIsCurrentRoute('settings.', false);
```

<FrontmatterDocs/>

## Uses

- [useRouteNames](./useRouteNames)

## Type signature

```ts
declare function useIsCurrentRoute(
    route: string,
    strict?: boolean
): ComputedRef<boolean>;
```
