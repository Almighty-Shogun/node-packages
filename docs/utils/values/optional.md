---
outline: deep

params:
    - name: value
      description: Value or array to map when present.
      type: NullableOrUndefinable<Arrayable<U>>

    - name: callback
      description: Mapper called for each present value.
      type: '(value: U) => T'

returns: The mapped value for a single input, an array of mapped values for an array input, and `null` only when the input type can be missing.
---

# optional

Maps a nullable value only when it is present. Arrays are mapped item by item, while `null` and `undefined` return `null`.

Use it for compact transformations where nullable input should stay nullable without repeating guards around every mapper.

Four overloads keep the result usable without narrowing: the shape follows the input, and `null` only appears in the return type when the input type actually admits it. Mapping a value that cannot be missing needs no guard afterwards, while mapping a nullable one keeps the `null` you have to handle.

Order matters in both directions. The array overloads precede the single-value ones so an array input is never matched as a scalar, and the non-nullable overloads precede the nullable ones. The non-nullable pair is constrained with `U extends {}`, which excludes `null` and `undefined`, so a nullable argument falls through to the nullable overloads instead of quietly losing its `null`.

## Importing

```ts
import { optional } from '@almighty-shogun/utils';
```

## Usage

```ts
import { optional } from '@almighty-shogun/utils';

declare const projectId: string | null;

const label = optional('profile', value => value.toUpperCase());
const ids = optional([1, 2, 3], value => value.toString());
const slug = optional(projectId, value => value.toLowerCase());

// label: string
// ids: string[]
// slug: string | null
```

<FrontmatterDocs/>

## Uses

- [Nullable](../types#nullable)
- [NullableOrUndefinable](../types#nullableorundefinable)

## Type signature

```ts
declare function optional<T, U extends {}>(
    value: U[],
    callback: (value: U) => T
): T[];

declare function optional<T, U extends {}>(
    value: U,
    callback: (value: U) => T
): T;

declare function optional<T, U>(
    value: NullableOrUndefinable<U[]>,
    callback: (value: U) => T
): Nullable<T[]>;

declare function optional<T, U>(
    value: NullableOrUndefinable<U>,
    callback: (value: U) => T
): Nullable<T>;
```
