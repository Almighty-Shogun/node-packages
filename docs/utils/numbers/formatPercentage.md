---
outline: deep

params:
    - name: value
      description: Value to format.
      type: number

    - name: locale
      description: Locale override.
      type: Undefinable<string>
      optional: true

returns: A localized percentage string. The input is treated as a ratio, so `0.5` represents fifty percent.
---

# formatPercentage

Formats a number as a localized percentage. The input is treated as a ratio, so `0.875` becomes an `87.5%`-style label depending on locale.

## Importing

```ts
import { formatPercentage } from '@almighty-shogun/utils';
```

## Usage

```ts
import { formatPercentage } from '@almighty-shogun/utils';

const completion = formatPercentage(0.875, 'en');
```

<FrontmatterDocs/>

## Uses

- [Undefinable](../types#undefinable)

## Type signature

```ts
declare function formatPercentage(
    value: number,
    locale?: Undefinable<string>
): string;
```
