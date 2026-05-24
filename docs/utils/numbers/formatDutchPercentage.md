---
outline: deep

params:
    - name: value
      description: Value to format.
      type: number

returns: A Dutch localized percentage string.
---

# formatDutchPercentage

Formats a number as a Dutch localized percentage. The input should be a ratio, so `0.25` is displayed as `25%` according to locale rules.

## Importing

```ts
import { formatDutchPercentage } from '@almighty-shogun/utils'
```

## Usage

```ts
import { formatDutchPercentage } from '@almighty-shogun/utils'

const conversion = formatDutchPercentage(0.153);
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatDutchPercentage(value: number): string;
```


## Uses

- [formatPercentage](./formatPercentage)
