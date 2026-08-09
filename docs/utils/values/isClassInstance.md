---
outline: deep

params:
    - name: value
      description: Value to test.
      type: unknown

returns: '`true` when the value is an object built from a constructor other than `Object`.'
---

# isClassInstance

Checks whether a value is a constructed object rather than a plain object literal, an array, or a primitive. Use it when behavior depends on a value carrying a prototype, such as deciding whether to rebuild methods after parsing, choosing between structural and instance-aware comparison, or refusing to merge configuration into something that is not a plain record.

The check is prototype-based, not user-defined-class-based, so built-in types count as instances. `Date`, `Map`, `Set`, `URL`, `RegExp`, and Luxon's `DateTime` all return `true` alongside your own classes.

The function is a type guard for `object`, which narrows away `null`, arrays, and primitives in the true branch.

## Importing

```ts
import { isClassInstance } from '@almighty-shogun/utils';
```

## Usage

```ts
import { isClassInstance } from '@almighty-shogun/utils';

class Point {
    constructor(public x = 0, public y = 0) {}
}

isClassInstance(new Point());   // true
isClassInstance(new Date());    // true
isClassInstance({ x: 0 });      // false
isClassInstance([1, 2]);        // false
isClassInstance(null);          // false
isClassInstance('text');        // false
```

## Edge cases

An object created with no prototype has no `constructor`, so it is reported as an instance:

```ts
import { isClassInstance } from '@almighty-shogun/utils';

isClassInstance(Object.create(null));

// true
```

That suits callers who use the result to mean "not a plain record", which is how [`deserialize`](../serialization/deserialize) uses it. Add an explicit `Object.getPrototypeOf(value) !== null` check when a null-prototype object should be treated as plain.

<FrontmatterDocs/>

## Uses

- [hasValue](./hasValue)

## Type signature

```ts
declare function isClassInstance(value: unknown): value is object;
```
