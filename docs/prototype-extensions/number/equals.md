---
outline: deep

params:
    - name: value
      description: Number to compare against.
      type: number

returns: '`true` when both numbers are equal.'
---

# equals

Compares the number with another number using strict equality. It does not coerce strings or other primitive values, so `(1).equals('1' as never)` is not considered equal.

## Usage

```ts
const isSamePage = (2).equals(2)

// true
```

<FrontmatterDocs/>

## Type signature

```ts
interface Number {
    equals(value: number): boolean;
}
```
