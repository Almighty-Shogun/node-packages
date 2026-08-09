---
outline: deep

params:
    - name: component
      description: Imported component used only to type the ref. Its runtime value is never read.
      type: TComponent

returns: A Vue ref for a component instance, initialized to `null`.
---

# componentRef

Creates a Vue ref for a component template ref. Pass the imported component so the ref value is typed as that component's exposed instance or `null`. The component argument is used for its type only; the helper always returns `ref(null)` and never touches the value at runtime.

The ref can only access members that the child component exposes. With `<script setup>`, expose methods and values from the child with Vue's `defineExpose()`, then call them through `ref.value` in the parent.

## Importing

```ts
import { componentRef } from '@almighty-shogun/common';
```

## Usage

::: code-group

```vue [Dashboard.vue]
<template>
    <UserCard ref="userCard" />
    <button @click="refreshUserCard">Refresh user card</button>
</template>

<script setup lang="ts">
import UserCard from './UserCard.vue';
import { componentRef } from '@almighty-shogun/common';

const userCard = componentRef(UserCard);

function refreshUserCard(): void {
    userCard.value?.refresh();
}
</script>
```

```vue [UserCard.vue]
<template>
    <article>
        <h2>{{ name }}</h2>
        <button @click="refresh">Refresh</button>
    </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('Ada');

function refresh(): void {
    name.value = 'Grace';
}

defineExpose({
    refresh
});
</script>
```

:::

<FrontmatterDocs/>

## Uses

- [Nullable](../../utils/types#nullable)

## Type signature

```ts
declare function componentRef<TComponent extends ComponentImport>(
    component: TComponent
): Ref<Nullable<InstanceType<TComponent>>>;

type ComponentImport = abstract new (...args: any[]) => any;
```
