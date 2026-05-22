---
outline: deep

params:
    - name: value
      description: Number to compare against.
      type: number

    - name: allowEqual
      description: When `true`, equality is accepted.
      type: boolean

returns: '`true` when the number is lower than `value`, or lower than or equal when `allowEqual` is `true`.'
---

# isLowerThan

Checks whether the number is lower than another value. Set `allowEqual` to `true` when the boundary value should also pass, such as validating a maximum allowed count.

## Usage

```ts
const isBelowLimit = (9).isLowerThan(10)

// true
```

<FrontmatterDocs/>

## Type signature

```ts
interface Number {
    isLowerThan(value: number, allowEqual?: boolean): boolean;
}
```
