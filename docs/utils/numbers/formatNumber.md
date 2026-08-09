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

    - name: locale
      description: Locale override.
      type: Undefinable<string>
      optional: true

returns: A localized number string with exactly `decimals` fraction digits. This is useful when table columns need visually consistent precision.
---

# formatNumber

Formats a number with a fixed number of fraction digits using `Intl.NumberFormat`. Use it to keep numeric precision consistent across tables, cards, and chart labels.

## Importing

```ts
import { formatNumber } from '@almighty-shogun/utils';
```

## Usage

```ts
import { formatNumber } from '@almighty-shogun/utils';

const amount = formatNumber(1234.567, 2, 'en');
```

<FrontmatterDocs/>

## Uses

- [Undefinable](../types#undefinable)

## Type signature

```ts
declare function formatNumber(
    value: number,
    decimals?: number,
    locale?: Undefinable<string>
): string;
```
