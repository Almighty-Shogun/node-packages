---
outline: deep

params:
    - name: pageSize
      description: Initial `perPage` value. Defaults to `5`.
      type: number

returns:
    - name: limits
      description: 'Available page-size options: `[5, 10, 25, 50, 100]`.'
      type: Ref<number[]>

    - name: page
      description: One-based current page. Starts at `1`.
      type: Ref<number>

    - name: perPage
      description: Current page size. Starts with `pageSize`.
      type: Ref<number>

    - name: total
      description: Total number of items across all pages. Starts at `0`.
      type: Ref<number>

    - name: setTotal(total)
      description: Updates total item count.
      type: '(total: number) => void'

    - name: setPage(page)
      description: Updates the active page.
      type: '(page: number) => void'

    - name: setPerPage(perPage)
      description: Updates the active page size.
      type: '(perPage: number) => void'
---

# usePagination

Creates reusable pagination primitives without assuming how data is loaded. Use it when multiple components need the same page, page-size, total, and limits behavior, whether data is sliced locally or fetched from a server.

The composable keeps state deliberately simple: setters only assign values and do not clamp pages, reset page numbers, or trigger side effects. That makes it predictable, but callers should handle validation when needed.

## Importing

```ts
import { usePagination } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { watch } from 'vue'
import { usePagination } from '@almighty-shogun/vue-utils'

const { page, perPage, setPage, setPerPage, setTotal } = usePagination(25);

watch([page, perPage], async () => {
    const response = await fetch('/api/users?page=' + page.value + '&limit=' + perPage.value);
    const result = await response.json();

    setTotal(result.total);
});

setPage(2);
setPerPage(50);
```

<FrontmatterDocs/>

## Type signature

```ts
declare function usePagination(pageSize?: number): UsePagination;

type UsePagination = {
    readonly limits: Ref<number[]>;
    readonly page: Ref<number>;
    readonly perPage: Ref<number>;
    readonly total: Ref<number>;

    setTotal(total: number): void;
    setPage(page: number): void;
    setPerPage(perPage: number): void;
};
```
