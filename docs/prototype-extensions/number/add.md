---
outline: deep

params:
    - name: value
      description: Value to add.
      type: number

returns: The sum.
---

# add

Adds the provided number to the current number and returns the result. The method is a readable arithmetic helper and does not mutate any state.

## Usage

```ts
const total = (10).add(5);

// 15
```

<FrontmatterDocs/>

## Type signature

```ts
interface Number {
    add(value: number): number;
}
```
