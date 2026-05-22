---
outline: deep

returns: The first array item.
---

# first

Returns the first item in an array. This is a convenience wrapper around index `0`, useful in code that reads better as an operation on the collection itself. If the array is empty, the runtime result is `undefined`, even though the TypeScript declaration follows the array item type.

## Usage

```ts
const users = ['Ada', 'Linus', 'Grace']
const firstUser = users.first()

// 'Ada'
```

<FrontmatterDocs/>

## Type signature

```ts
interface Array<T> {
    first(): T;
}
```
