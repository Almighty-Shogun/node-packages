---
outline: deep

params:
    - name: route
      description: Route name to look for among the matched route names. Omit it to receive a template-friendly predicate instead.
      type: string
      optional: true

    - name: strict
      description: Require an exact name match. Set to `false` to match on prefix instead.
      type: boolean
      optional: true
      defaultValue: 'true'

returns: A computed boolean when `route` is provided, or an `isRoute()` predicate when it is omitted.
---

# useIsRoute

Checks whether a route name is among the currently matched route records. Vue Router keeps every ancestor matched while a child renders, so a parent's name still reports `true` from inside its children.

Names are compared exactly, so `useIsRoute('settings')` only matches a record actually named `settings`. Pass `false` for `strict` to compare by prefix instead, which also matches an unrelated `settings-billing`.

Call it with a route name when script code needs a `ComputedRef<boolean>`. Call it without arguments when a template should check several route names without writing `.value`; the returned function reads the same reactive route names, so template renders update after navigation.

## Importing

```ts
import { useIsRoute } from '@almighty-shogun/common';
```

## Usage

```vue
<template>
    <nav>
        <RouterLink to="/settings" :class="{ active: isRoute('settings') }">
            Settings
        </RouterLink>

        <span v-if="isSettings">Current section</span>
    </nav>
</template>

<script setup lang="ts">
import { useIsRoute } from '@almighty-shogun/common';

const isSettings = useIsRoute('settings');
const isRoute = useIsRoute();
</script>
```

<FrontmatterDocs/>

## Uses

- [useRouteNames](./useRouteNames)

## Type signature

```ts
declare function useIsRoute(): IsRoute;

declare function useIsRoute(
    route: string,
    strict?: boolean
): ComputedRef<boolean>;

type IsRoute = (route: string, strict?: boolean) => boolean;
```
