---
outline: deep

params:
    - name: routes
      description: Application route names.
      type: string[]

returns: '`true` when the current route name is in `routes`.'
---

# hasCurrentRoute

Checks whether the active route name is part of a known list. Use it when a nav item or layout state should be active for several related routes.

## Importing

```ts
import { hasCurrentRoute } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { hasCurrentRoute } from '@almighty-shogun/vue-utils'

const isInUsersArea = hasCurrentRoute(['users.index', 'users.show'])
```

<FrontmatterDocs/>

## Type signature

```ts
declare function hasCurrentRoute(routes: string[]): boolean;
```
