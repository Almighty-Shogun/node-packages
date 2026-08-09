---
outline: deep

params:
    - name: value
      description: Serialized value to parse.
      type: string

    - name: defaultValue
      description: Value of the type you expect back. It selects the parser and is returned when parsing fails.
      type: T

returns: The parsed value, or `defaultValue` when the string cannot be parsed as that type.
---

# deserialize

Parses a string back into the type of `defaultValue`, and returns `defaultValue` unchanged when that is not possible. It is the counterpart to [`serialize`](./serialize).

The function never throws. It catches conversions that fail loudly, such as `JSON.parse` and `BigInt`, and also checks the ones that report failure quietly: `Number` returning `NaN`, `Date` and Luxon returning invalid instances, and a boolean parse receiving text that is neither `'true'` nor `'false'`.

::: tip
The second argument does double duty, which is why it is always required. TypeScript generics are erased at build time, so `deserialize<number>('2')` would give the function nothing to inspect at runtime. Passing a real value of the expected type both selects the parser and, for class instances, supplies the prototype the result is rebuilt on.
:::

## Importing

```ts
import { deserialize } from '@almighty-shogun/utils';
```

## Usage

```ts
import { deserialize } from '@almighty-shogun/utils';

const page = deserialize('2', 1);
const settings = deserialize('{"sidebar":true}', { sidebar: false });
const badNumber = deserialize('abc', 1);
const badJson = deserialize('{bad', { sidebar: false });
const badDate = deserialize('nope', new Date(0));
const badBoolean = deserialize('garbage', true);
const blank = deserialize('', 1);

// page: 2
// settings: { sidebar: true }
// badNumber: 1, because Number('abc') is NaN
// badJson: { sidebar: false }, because JSON.parse throws
// badDate: new Date(0), because the parse is invalid
// badBoolean: true, because the text is neither 'true' nor 'false'
// blank: 0, because Number('') is a valid 0 rather than a failure
```

::: tip
Guard empty strings with [`hasValue`](../values/hasValue) before calling when `blank` should fall back to the default instead.
:::

## Supported types

`string`, `number`, `boolean`, `bigint`, `null`, `undefined`, Luxon `DateTime`, `Date`, `URL`, `Set`, and `Map` each have a dedicated parser, chosen from the runtime type of `defaultValue`.

Anything else is parsed as JSON. When [`isClassInstance`](../values/isClassInstance) reports that `defaultValue` carries a prototype rather than being a plain object, the parsed properties are assigned onto a new object created from that prototype, so methods survive the round trip:

```ts
import { serialize, deserialize } from '@almighty-shogun/utils';

class Point {
    constructor(public x = 0, public y = 0) {}

    sum(): number {
        return this.x + this.y;
    }
}

const restored = deserialize(serialize(new Point(2, 3)), new Point());

restored.sum();

// 5
```

<FrontmatterDocs/>

## Uses

- [isClassInstance](../values/isClassInstance)
- [serialize](./serialize)

## Type signature

```ts
declare function deserialize<T>(value: string, defaultValue: T): T;
```
