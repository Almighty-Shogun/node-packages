---
outline: deep

returns: The numeric conversion result.
---

# toNumber

Converts a string with JavaScript's `Number()` constructor. This means numeric strings become numbers, empty strings become `0`, and non-numeric values become `NaN`.

## Usage

```ts
const amount = '42'.toNumber();

// 42
```

<FrontmatterDocs/>

## Type signature

```ts
interface String {
    toNumber(): number;
}
```
