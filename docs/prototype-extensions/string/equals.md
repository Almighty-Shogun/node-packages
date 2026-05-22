---
outline: deep

params:
    - name: value
      description: String to compare against.
      type: string

returns: '`true` when both strings are equal.'
---

# equals

Compares the string with another string using strict equality. The comparison is case-sensitive and does not trim whitespace.

## Usage

```ts
const isSameRole = 'admin'.equals('admin')

// true
```

<FrontmatterDocs/>

## Type signature

```ts
interface String {
    equals(value: string): boolean;
}
```
