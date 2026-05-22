---
outline: deep

returns: '`true` when the string length is `0`.'
---

# isEmpty

Checks whether the string contains no characters by reading `length === 0`. The check uses the raw string value, so whitespace still counts as content.

## Usage

```ts
const value = ''
const missingValue = value.isEmpty()

// true
```

<FrontmatterDocs/>

## Type signature

```ts
interface String {
    isEmpty(): boolean;
}
```
