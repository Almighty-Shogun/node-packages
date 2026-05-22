---
outline: deep

params:
    - name: value
      description: Divisor.
      type: number

returns: The quotient.
---

# divide

Divides the current number by the provided value and returns the quotient. Division by zero follows normal JavaScript behavior and returns `Infinity`, `-Infinity`, or `NaN` depending on the input.

## Usage

```ts
const pages = (50).divide(10)

// 5
```

<FrontmatterDocs/>

## Type signature

```ts
interface Number {
    divide(value: number): number;
}
```
