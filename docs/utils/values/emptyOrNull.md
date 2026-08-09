---
outline: deep

params:
    - name: value
      description: Value to normalize.
      type: NullableOrUndefinable<T>

returns: The original value, or `null` when the value is `null`, `undefined`, an empty array, or a blank string.
---

# emptyOrNull

Normalizes missing and empty values to `null`. It treats `null`, `undefined`, empty arrays, and strings that are blank after trimming as empty, and returns everything else untouched.

Use it when downstream code should work with one empty sentinel instead of the several shapes JavaScript uses to mean "nothing".

## Importing

```ts
import { emptyOrNull } from '@almighty-shogun/utils';
```

## Usage

```ts
import { emptyOrNull } from '@almighty-shogun/utils';

emptyOrNull('project');       // 'project'
emptyOrNull('');              // null
emptyOrNull('   ');           // null
emptyOrNull([1, 2]);          // [1, 2]
emptyOrNull([]);              // null
emptyOrNull(null);            // null
emptyOrNull(undefined);       // null
emptyOrNull(0);               // 0
emptyOrNull(false);           // false
```

<FrontmatterDocs/>

## Uses

- [Nullable](../types#nullable)
- [NullableOrUndefinable](../types#nullableorundefinable)

## Type signature

```ts
declare function emptyOrNull<T>(
    value: NullableOrUndefinable<T>
): Nullable<T>;
```
