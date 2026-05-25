---
outline: deep

params:
    - name: length
      description: Maximum number of original characters to keep.
      type: number

    - name: appending
      description: Suffix used when the string is truncated.
      type: string | null
      defaultValue: 'null'

returns: The original string when it fits, otherwise the truncated string plus `appending`.
---

# limit

Limits a string to a maximum number of original characters. When the string is longer than the provided length, the method returns `substring(0, length)` plus the `appending` value. Pass an empty string or `null` when no suffix should be shown.

## Usage

```ts
const label = 'Dashboard overview'.limit(9, '...');

// 'Dashboard...'
```

<FrontmatterDocs/>

## Type signature

```ts
interface String {
    limit(length: number, appending: string | null): string;
}
```
