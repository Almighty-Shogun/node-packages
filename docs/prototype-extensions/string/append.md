---
outline: deep

params:
    - name: value
      description: String to append.
      type: string

returns: The combined string.
---

# append

Returns a new string with another string appended to the end. It is a small readability helper for cases where chaining string operations reads better than using the `+` operator inline.

## Usage

```ts
const path = '/users'.append('/42');

// '/users/42'
```

<FrontmatterDocs/>

## Type signature

```ts
interface String {
    append(value: string): string;
}
```
