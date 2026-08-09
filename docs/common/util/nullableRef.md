---
outline: deep

params:
    - name: value
      description: Initial value for the ref.
      type: Undefinable<T>
      optional: true
      defaultValue: 'null'

returns: A Vue ref whose value can be `null`.
---

# nullableRef

Creates a Vue ref that starts as `null` unless an initial value is provided. Use it for refs that are intentionally empty during setup but should keep a concrete value type after assignment.

## Importing

```ts
import { nullableRef } from '@almighty-shogun/common';
```

## Usage

```ts
import { nullableRef } from '@almighty-shogun/common';

const selectedId = nullableRef<number>();
const count = nullableRef(123);

selectedId.value = 42;
count.value = null;
```

<FrontmatterDocs/>

## Uses

- [Nullable](../../utils/types#nullable)
- [Undefinable](../../utils/types#undefinable)

## Type signature

```ts
declare function nullableRef<T = never>(
    value?: Undefinable<T>
): Ref<Nullable<T>>;
```
