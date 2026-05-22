---
outline: deep

params:
    - name: min
      description: Inclusive lower bound.
      type: number

    - name: max
      description: Inclusive upper bound.
      type: number

returns: '`true` when the number is between `min` and `max`.'
---

# isInRange

Checks whether the number falls inside an inclusive range. Both boundaries are included, so the method returns `true` when the number is exactly equal to `min` or `max`.

## Usage

```ts
const isValidPageSize = (25).isInRange(5, 100)

// true
```

<FrontmatterDocs/>

## Type signature

```ts
interface Number {
    isInRange(min: number, max: number): boolean;
}
```
