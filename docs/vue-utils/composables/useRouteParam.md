---
outline: deep

params:
    - name: name
      description: Route parameter name to read from `route.params`.
      type: string

    - name: defaultValue
      description: Fallback used when the parameter is missing or is not a single string value. Passing a number also converts matching route values with `Number()`.
      type: T | null
      defaultValue: 'null'

returns: A reactive `Ref<T | null>` containing the current route parameter value.
---

# useRouteParam

Reads a single Vue Router route parameter into a Vue ref. The returned ref updates whenever the active route changes, so components can consume route parameters without manually watching `useRoute()`.

By default, parameters are returned as strings. When `defaultValue` is a number, the route parameter is converted with `Number()` before it is assigned. If the parameter is missing, repeated, or otherwise not a string, the ref falls back to `defaultValue`.

## Importing

```ts
import { useRouteParam } from '@almighty-shogun/vue-utils'
```

## Usage

```vue
<template>
    <p>User {{ userId }}</p>
</template>

<script setup lang="ts">
import { useRouteParam } from '@almighty-shogun/vue-utils'

const userId = useRouteParam('userId');
</script>
```

```vue
<template>
    <p>Page {{ page }}</p>
</template>

<script setup lang="ts">
import { useRouteParam } from '@almighty-shogun/vue-utils'

const page = useRouteParam('page', 1);
</script>
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useRouteParam<T = string>(
    name: string,
    defaultValue: T | null
): Ref<T | null>;
```
