---
outline: deep

params:
    - name: value
      description: Value to subtract.
      type: number

returns: The difference.
---

# subtract

Subtracts the provided number from the current number and returns the result. It follows normal JavaScript number behavior for decimals, `Infinity`, and `NaN`.

## Usage

```ts
const remaining = (10).subtract(4)

// 6
```

<FrontmatterDocs/>

## Type signature

```ts
interface Number {
    subtract(value: number): number;
}
```
