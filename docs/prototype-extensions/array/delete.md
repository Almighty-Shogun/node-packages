---
outline: deep

params:
    - name: index
      description: Index to remove.
      type: number

returns: A new array without the item at `index`.
---

# delete

Returns a copy of the array without the item at the provided index. The original array is not mutated because the implementation uses `toSpliced`, making it suitable for immutable state updates in UI code.

## Usage

```ts
const values = ['draft', 'published', 'archived'];
const nextValues = values.delete(1);

// ['draft', 'archived']
```

<FrontmatterDocs/>

## Type signature

```ts
interface Array<T> {
    delete(index: number): T[];
}
```
