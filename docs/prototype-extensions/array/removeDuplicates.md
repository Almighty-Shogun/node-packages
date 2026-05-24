---
outline: deep

returns: A new array with duplicates removed.
---

# removeDuplicates

Returns a new array with duplicate string or number values removed. The first occurrence of each value is preserved because the method is backed by a `Set` created from the original array order.

## Usage

```ts
const ids = [1, 2, 2, 3, 3];
const uniqueIds = ids.removeDuplicates();

// [1, 2, 3]
```

<FrontmatterDocs/>

## Type signature

```ts
interface Array<T> {
    removeDuplicates(): (string | number)[];
}
```
