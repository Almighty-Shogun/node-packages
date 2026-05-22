---
outline: deep

params:
    - name: date
      description: Date to format.
      type: DateTime

    - name: locale
      description: Optional locale override.
      type: string

returns: A localized date string such as `May 20, 2026` in English locales. The exact output depends on the locale data available in the runtime.
---

# formatDate

Formats a Luxon `DateTime` as a localized calendar date with year, month, and day. It centralizes the formatting options so views can use the same date presentation without repeating Luxon configuration.

## Importing

```ts
import { formatDate } from '@almighty-shogun/utils'
```

## Usage

```ts
import { DateTime } from 'luxon'
import { formatDate } from '@almighty-shogun/utils'

const label = formatDate(DateTime.fromISO('2026-05-20'), 'en')

// 'May 20, 2026'
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatDate(date: DateTime, locale?: string): string;
```
