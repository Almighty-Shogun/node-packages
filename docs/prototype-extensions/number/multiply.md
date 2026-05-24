---
outline: deep

params:
    - name: value
      description: Multiplier.
      type: number

returns: The product.
---

# multiply

Multiplies the current number by the provided value and returns the product. It is a chainable readability helper around the `*` operator.

## Usage

```ts
const total = (6).multiply(7);

// 42
```

<FrontmatterDocs/>

## Type signature

```ts
interface Number {
    multiply(value: number): number;
}
```
