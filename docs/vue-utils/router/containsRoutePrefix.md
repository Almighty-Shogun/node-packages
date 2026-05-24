---
outline: deep

params:
    - name: prefix
      description: Route name prefix.
      type: string

returns: '`true` when the current route name starts with `prefix`.'
---

# containsRoutePrefix

Checks whether the current route name starts with a prefix. This is useful for grouping route names by feature area, such as `settings.profile` and `settings.security`.

## Importing

```ts
import { containsRoutePrefix } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { containsRoutePrefix } from '@almighty-shogun/vue-utils'

const isSettingsPage = containsRoutePrefix('settings.');
```

<FrontmatterDocs/>

## Type signature

```ts
declare function containsRoutePrefix(prefix: string): boolean;
```
