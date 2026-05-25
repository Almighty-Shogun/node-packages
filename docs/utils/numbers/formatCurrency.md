---
outline: deep

params:
    - name: value
      description: Value to format.
      type: number

    - name: currency
      description: Currency code.
      type: string
      optional: true
      defaultValue: 'EUR'

    - name: locale
      description: Locale override.
      type: string
      optional: true

returns: A localized currency string with exactly two fraction digits. When no currency is provided, Euro formatting is used.
---

# formatCurrency

Formats a number as localized currency using `Intl.NumberFormat`. The locale follows the package locale fallback unless a locale is provided explicitly.

## Importing

```ts
import { formatCurrency } from '@almighty-shogun/utils'
```

## Usage

```ts
import { formatCurrency } from '@almighty-shogun/utils'

const total = formatCurrency(1299.5, 'EUR', 'nl');
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatCurrency(
    value: number,
    currency?: string,
    locale?: string
): string;
```
