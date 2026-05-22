---
outline: deep

params:
    - name: value
      description: Value to remove when present or append when absent.
      type: string | number

returns: A new array with the value toggled.
---

# addOrRemove

Toggles a string or number inside an array. If the value already exists, the method returns a new array without it. If it does not exist, the method returns a new array with the value appended. This is useful for selected IDs, active filters, and checkbox-like state.

## Usage

```ts
const selected = ['users', 'settings']
const nextSelected = selected.addOrRemove('users')

// ['settings']
```

<FrontmatterDocs/>

## Type signature

```ts
interface Array<T> {
    addOrRemove(value: string | number): (string | number)[];
}
```

## Uses

- [delete](./delete)
