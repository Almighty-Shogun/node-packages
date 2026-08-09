---
outline: deep

params:
    - name: value
      description: String to transform.
      type: string

returns: The string with its first character uppercased.
---

# upperFirst

Uppercases the first character of a string and leaves the rest of the string unchanged.

## Importing

```ts
import { upperFirst } from '@almighty-shogun/utils';
```

## Usage

```ts
import { upperFirst } from '@almighty-shogun/utils';

const label = upperFirst('settings');

// 'Settings'
```

<FrontmatterDocs/>

## Type signature

```ts
declare function upperFirst(value: string): string;
```
