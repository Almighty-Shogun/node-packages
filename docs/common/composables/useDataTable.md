---
outline: deep

params:
    - name: items
      description: Reactive array containing the full collection that should be paginated.
      type: Ref<T[]>

    - name: pageSize
      description: Initial number of items per page.
      type: Undefinable<MaybeRefOrGetter<number>>
      optional: true
      defaultValue: '5'

returns:
    - name: filteredItems
      description: Computed slice of `items` for the active page and page size.
      type: Ref<T[]>

    - name: isEmpty
      description: '`true` when the current page slice contains no items.'
      type: Ref<boolean>

    - name: total
      description: Total number of source items, kept in sync with `items` automatically rather than set by hand.
      type: Ref<number>

    - name: 'setTotal(total: number): void'
      description: Overrides the synchronized total. Rarely needed here, since the watcher maintains it.

    - name: page
      description: Passed through from [`usePagination`](./usePagination).
      type: Ref<number>

    - name: perPage
      description: Passed through from [`usePagination`](./usePagination).
      type: Ref<number>

    - name: limits
      description: Passed through from [`usePagination`](./usePagination).
      type: Ref<number[]>

    - name: 'setPage(page: number): void'
      description: Passed through from [`usePagination`](./usePagination).

    - name: 'setPerPage(perPage: number): void'
      description: Passed through from [`usePagination`](./usePagination).
---

# useDataTable

Combines a reactive item collection with pagination state and exposes the current visible slice as `filteredItems`. This composable is intended for client-side tables where the full dataset is already available in memory and only the rendered page needs to change.

It is built on [`usePagination`](./usePagination) and re-exposes that composable's entire return value unchanged, so `page`, `perPage`, `limits`, `setPage`, and `setPerPage` behave exactly as documented there. What this composable adds is the slicing and two differences in how `total` is managed.

`filteredItems` is the slice of `items` for the active page, and `total` is kept in sync with `items.value.length` by a watcher, so `setTotal` is rarely needed. Changing `page` or `perPage` immediately changes the slice; it does not fetch data from an API and does not mutate the source items.

`isEmpty` reports on the visible slice rather than the source collection, so it is also `true` when the source has items but the active page is out of range.

## Importing

```ts
import { useDataTable } from '@almighty-shogun/common';
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDataTable } from '@almighty-shogun/common';

type User = { id: number; name: string };

const users = ref<User[]>([
    { id: 1, name: 'Ada' },
    { id: 2, name: 'Grace' },
    { id: 3, name: 'Linus' }
]);

const { filteredItems, isEmpty } = useDataTable(users, 10);
</script>
```

`limits` and `setPerPage` drive a page-size control the same way they do in [`usePagination`](./usePagination), which is where that example lives.

<FrontmatterDocs/>

## Uses

- [Undefinable](../../utils/types#undefinable)
- [usePagination](./usePagination)

## Type signature

```ts
declare function useDataTable<T>(
    items: Ref<T[]>,
    pageSize?: Undefinable<MaybeRefOrGetter<number>>
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
