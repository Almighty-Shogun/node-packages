---
outline: deep

params:
    - name: value
      description: Value to format.
      type: number

    - name: decimals
      description: Fraction digits.
      type: number
      optional: true
      defaultValue: '2'

returns: A Dutch localized number string.
---

# formatDutchNumber

Formats a number using Dutch locale rules and a fixed number of decimal places. Use `decimals` to align values in tables, cards, and chart labels.

## Importing

```ts
import { formatDutchNumber } from '@almighty-shogun/utils';
```

## Usage

```ts
import { formatDutchNumber } from '@almighty-shogun/utils';

const amount = formatDutchNumber(1234.567, 1);
```

<FrontmatterDocs/>

## Uses

- [formatNumber](./formatNumber)

## Type signature

```ts
declare function formatDutchNumber(
    value: number,
    decimals?: number
): string;
```
