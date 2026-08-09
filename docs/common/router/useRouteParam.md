---
outline: deep

params:
    - name: name
      description: Route parameter name to read from `route.params`.
      type: string

    - name: defaultValue
      description: Fallback used when the parameter has no value. Also provides the deserialization template for present values.
      type: Nullable<T>
      optional: true
      defaultValue: 'null'

returns: A reactive `Ref<Nullable<T>>` containing the current route parameter value.
---

# useRouteParam

Reads a Vue Router route parameter into a Vue ref. The returned ref updates whenever the active route changes, so components can consume route parameters without manually watching `useRoute()`.

When the route parameter has a value, the composable returns it directly unless `defaultValue` has a value. In that case, `deserialize(value, defaultValue)` is used so numeric and other typed defaults can shape the returned value. When the route parameter has no value, the ref falls back to `defaultValue` or `null`.

## Importing

```ts
import { useRouteParam } from '@almighty-shogun/common';
```

## Usage

::: code-group

```vue [UserView.vue]
<template>
    <p>User {{ userId }}</p>
</template>

<script setup lang="ts">
import { useRouteParam } from '@almighty-shogun/common';

const userId = useRouteParam('userId');
</script>
```

```vue [UserList.vue]
<template>
    <p>Page {{ page }}</p>
</template>

<script setup lang="ts">
import { useRouteParam } from '@almighty-shogun/common';

const page = useRouteParam('page', 1);
</script>
```

:::

<FrontmatterDocs/>

## Uses

- [Nullable](../../utils/types#nullable)
- [deserialize](../../utils/serialization/deserialize)

## Type signature

```ts
declare function useRouteParam<T = string>(
    name: string,
    defaultValue?: Nullable<T>
): Ref<Nullable<T>>;
```
