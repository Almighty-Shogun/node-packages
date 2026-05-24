---
outline: deep

params:
    - name: route
      description: Route name to compare against.
      type: string

returns: '`true` when the current route name equals `route`.'
---

# isCurrentRoute

Checks whether the current route name exactly matches the provided route name. This is the narrowest route helper and is useful for active states on single-route links.

## Importing

```ts
import { isCurrentRoute } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { isCurrentRoute } from '@almighty-shogun/vue-utils'

const isDashboard = isCurrentRoute('dashboard');
```

<FrontmatterDocs/>

## Type signature

```ts
declare function isCurrentRoute(route: string): boolean;
```
