---
outline: deep

params:
    - name: date
      description: Date and time to format.
      type: DateTime

    - name: locale
      description: Optional locale override.
      type: string

returns: A localized date-time label containing weekday, day, month, hour, and minute. The exact punctuation and ordering come from Luxon and the active locale.
---

# formatDateTime

Formats a Luxon `DateTime` with weekday, day, month, hour, and minute. Use it for event labels, appointment times, and timeline entries where both the day and time matter.

## Importing

```ts
import { formatDateTime } from '@almighty-shogun/utils'
```

## Usage

```ts
import { DateTime } from 'luxon'
import { formatDateTime } from '@almighty-shogun/utils'

const label = formatDateTime(DateTime.fromISO('2026-05-20T14:30:00'), 'en');
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatDateTime(
    date: DateTime,
    locale?: string
): string;
```
