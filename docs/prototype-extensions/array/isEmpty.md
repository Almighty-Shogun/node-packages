---
outline: deep

returns: '`true` when the array length is `0`.'
---

# isEmpty

Checks whether the array contains no items by reading `length === 0`. It is a small readability helper for branches that show empty states, skip work when no data is available, or guard code that expects at least one item.

## Usage

```ts
const items: string[] = [];
const shouldShowEmptyState = items.isEmpty();

// true
```

<FrontmatterDocs/>

## Type signature

```ts
interface Array<T> {
    isEmpty(): boolean;
}
```
