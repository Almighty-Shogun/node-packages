---
outline: deep

returns: A new array with duplicates removed.
---

# removeDuplicates

Returns a new array with duplicate string or number values removed. The first occurrence of each value is preserved because the method is backed by a `Set` created from the original array order.

The method is declared with a `this` type of `Array<string | number>`, so TypeScript only allows it on string or number arrays. `Set` uses same-value-zero equality, which means values are compared without type coercion.

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
