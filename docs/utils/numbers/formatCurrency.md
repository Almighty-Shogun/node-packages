---
outline: deep

params:
    - name: value
      description: Value to format.
      type: number

    - name: currency
      description: Currency code. Defaults to `EUR`.
      type: string

    - name: locale
      description: Optional locale override.
      type: string

returns: A localized currency string with exactly two fraction digits. Defaults to Euro formatting when no currency is provided.
---

# formatCurrency

Formats a number as localized currency using `Intl.NumberFormat`. The currency defaults to `EUR`, and the locale follows the package locale fallback unless a locale is provided explicitly.

## Importing

```ts
import { formatCurrency } from '@almighty-shogun/utils'
```

## Usage

```ts
import { formatCurrency } from '@almighty-shogun/utils'

const total = formatCurrency(1299.5, 'EUR', 'nl')
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
