---
outline: deep

returns: The last array item.
---

# last

Returns the last item in an array. It reads from `array.length - 1`, so it is best used when the caller knows the array contains at least one item or can handle an `undefined` runtime value for empty arrays.

## Usage

```ts
const users = ['Ada', 'Linus', 'Grace']
const lastUser = users.last()

// 'Grace'
```

<FrontmatterDocs/>

## Type signature

```ts
interface Array<T> {
    last(): T;
}
```
