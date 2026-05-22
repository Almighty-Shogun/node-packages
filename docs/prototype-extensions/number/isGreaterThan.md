---
outline: deep

params:
    - name: value
      description: Number to compare against.
      type: number

    - name: allowEqual
      description: When `true`, equality is accepted.
      type: boolean

returns: '`true` when the number is greater than `value`, or greater than or equal when `allowEqual` is `true`.'
---

# isGreaterThan

Checks whether the number is greater than another value. Set `allowEqual` to `true` when the boundary value should also pass, such as validating a minimum required count.

## Usage

```ts
const isAboveMinimum = (10).isGreaterThan(5)

// true
```

<FrontmatterDocs/>

## Type signature

```ts
interface Number {
    isGreaterThan(value: number, allowEqual?: boolean): boolean;
}
```
