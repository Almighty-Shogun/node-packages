---
outline: deep

params:
    - name: date
      description: Date to format.
      type: DateTime

    - name: locale
      description: Optional locale override.
      type: string

returns: A localized hour string. Locale rules decide whether the result uses 12-hour or 24-hour formatting.
---

# formatHour

Formats only the hour component from a Luxon `DateTime`. Use it for hour labels in calendars, schedules, or chart axes.

## Importing

```ts
import { formatHour } from '@almighty-shogun/utils'
```

## Usage

```ts
import { DateTime } from 'luxon'
import { formatHour } from '@almighty-shogun/utils'

const hour = formatHour(DateTime.fromISO('2026-05-20T09:45:00'), 'en')
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatHour(date: DateTime, locale?: string): string;
```
