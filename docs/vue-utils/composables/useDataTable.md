---
outline: deep

params:
    - name: items
      description: Reactive array containing the full collection that should be paginated.
      type: Ref<T[]>

    - name: pageSize
      description: Initial number of items per page. Defaults to `5`.
      type: number

returns:
    - name: isEmpty
      description: true` when the current source collection contains no items.
      type: Ref<boolean>

    - name: total
      description: Total number of source items. It is updated when `items.value.length` changes.
      type: Ref<number>

    - name: page
      description: One-based active page number.
      type: Ref<number>

    - name: perPage
      description: Active page size.
      type: Ref<number>

    - name: limits
      description: 'Available page-size options: `[5, 10, 25, 50, 100]`.'
      type: Ref<number[]>

    - name: filteredItems
      description: Computed slice for the active page and page size.
      type: Ref<T[]>

    - name: setTotal(total)
      description: Manually overrides the total. Usually not needed because the watcher syncs it.
      type: '(total: number) => void'

    - name: setPage(page)
      description: Changes the active page.
      type: '(page: number) => void'

    - name: setPerPage(perPage)
      description: Changes the active page size.
      type: '(perPage: number) => void'
---

# useDataTable

Combines a reactive item collection with pagination state and exposes the current visible slice as `filteredItems`. This composable is intended for client-side tables where the full dataset is already available in memory and only the rendered page needs to change.

It watches the length of the source item array and keeps `total` synchronized automatically. Changing `page` or `perPage` immediately changes the computed slice; it does not fetch data from an API and does not mutate the source items.

## Importing

```ts
import { useDataTable } from '@almighty-shogun/vue-utils'
```

## Usage

```vue
<template>
    <p v-if="isEmpty">No users found.</p>

    <table v-else>
        <tr v-for="user in filteredItems" :key="user.id">
            <td>{{ user.name }}</td>
        </tr>
    </table>

    <select :value="perPage" @change="setPerPage(Number(($event.target as HTMLSelectElement).value))">
        <option v-for="limit in limits" :key="limit" :value="limit">
            {{ limit }}
        </option>
    </select>

    <button :disabled="page <= 1" @click="setPage(page - 1)">Previous</button>
    <button :disabled="page * perPage >= total" @click="setPage(page + 1)">Next</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDataTable } from '@almighty-shogun/vue-utils'

type User = { id: number; name: string }

const users = ref<User[]>([
    { id: 1, name: 'Ada' },
    { id: 2, name: 'Grace' },
    { id: 3, name: 'Linus' }
])

const {
    filteredItems,
    isEmpty,
    page,
    perPage,
    total,
    limits,
    setPage,
    setPerPage
} = useDataTable(users, 10)
</script>
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useDataTable<T>(
    items: Ref<T[]>,
    pageSize?: number
): UseDataTable<T>;

type UseDataTable<T> = {
    readonly isEmpty: Ref<boolean>;
    readonly total: Ref<number>;
    readonly page: Ref<number>;
    readonly perPage: Ref<number>;
    readonly limits: Ref<number[]>;
    readonly filteredItems: Ref<T[]>;

    setTotal(total: number): void;
    setPage(page: number): void;
    setPerPage(perPage: number): void;
};
```

## Uses

- [usePagination](./usePagination)
