---
outline: deep

params:
    - name: value
      description: Value to test.
      type: NullableOrUndefinable<T>

returns: '`true` when the value is not normalized to `null` by [`emptyOrNull`](./emptyOrNull).'
---

# hasValue

Checks whether a value should be treated as present. It uses [`emptyOrNull`](./emptyOrNull), so `null`, `undefined`, empty arrays, and blank strings are considered missing.

The function is a type guard for the non-nullable value.

## Importing

```ts
import { hasValue } from '@almighty-shogun/utils';
```

## Usage

```ts
import { hasValue } from '@almighty-shogun/utils';

const value: string | null = 'project';

if (hasValue(value)) {
    value.toUpperCase();
}
```

<FrontmatterDocs/>

## Uses

- [NullableOrUndefinable](../types#nullableorundefinable)
- [emptyOrNull](./emptyOrNull)

## Type signature

```ts
declare function hasValue<T>(value: NullableOrUndefinable<T>): value is T;
```
