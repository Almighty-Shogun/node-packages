---
outline: deep

returns: '`true` for even numbers.'
---

# isEven

Checks whether the number is evenly divisible by `2`. The method uses the remainder operator, so it is intended for integer-like values.

## Usage

```ts
const shouldAlternate = (4).isEven();

// true
```

<FrontmatterDocs/>

## Type signature

```ts
interface Number {
    isEven(): boolean;
}
```
