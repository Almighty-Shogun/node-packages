---
outline: deep

params:
    - name: date
      description: Date to format.
      type: DateTime

    - name: locale
      description: Optional locale override.
      type: string

returns: A localized date label containing weekday, day, and month. The year is intentionally omitted.
---

# formatFullDate

Formats a Luxon `DateTime` with weekday, day, and month, but no year. This works well for near-term dates where the year is obvious from context.

## Importing

```ts
import { formatFullDate } from '@almighty-shogun/utils'
```

## Usage

```ts
import { DateTime } from 'luxon'
import { formatFullDate } from '@almighty-shogun/utils'

const label = formatFullDate(DateTime.fromISO('2026-05-20'), 'en')
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatFullDate(
    date: DateTime,
    locale?: string
): string;
```
