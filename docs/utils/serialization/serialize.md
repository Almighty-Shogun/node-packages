---
outline: deep

params:
    - name: value
      description: Value to convert to a string.
      type: T

returns: The string representation used by matching deserializers and storage helpers.
---

# serialize

Serializes a value to a string. Primitive values and selected built-ins use type-specific conversion, while other values fall back to `JSON.stringify()`.

Built-in handling covers `string`, `number`, `boolean`, `bigint`, `null`, `undefined`, Luxon `DateTime`, `Date`, `URL`, `Set`, and `Map`.

## Importing

```ts
import { serialize } from '@almighty-shogun/utils';
```

## Usage

```ts
import { serialize } from '@almighty-shogun/utils';

const enabled = serialize(true);
const filters = serialize({ status: 'active' });
```

<FrontmatterDocs/>

## Type signature

```ts
declare function serialize<T>(value: T): string;
```
