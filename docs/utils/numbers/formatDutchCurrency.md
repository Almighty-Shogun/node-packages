---
outline: deep

params:
    - name: value
      description: Value to format.
      type: number

returns: A Dutch localized Euro currency string.
---

# formatDutchCurrency

Formats a number as Euro currency using Dutch locale rules. It is a focused shortcut for Dutch applications that always display Euro amounts.

## Importing

```ts
import { formatDutchCurrency } from '@almighty-shogun/utils'
```

## Usage

```ts
import { formatDutchCurrency } from '@almighty-shogun/utils'

const total = formatDutchCurrency(1299.5);
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatDutchCurrency(value: number): string;
```


## Uses

- [formatCurrency](./formatCurrency)
