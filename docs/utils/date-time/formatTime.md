---
outline: deep

params:
    - name: date
      description: Date to format.
      type: DateTime

    - name: locale
      description: Locale override.
      type: string
      optional: true

returns: A localized time string containing hour and minute.
---

# formatTime

Formats hour and minute from a Luxon `DateTime`. Use it when the date is already clear from context and only the time should be displayed.

## Importing

```ts
import { formatTime } from '@almighty-shogun/utils'
```

## Usage

```ts
import { DateTime } from 'luxon'
import { formatTime } from '@almighty-shogun/utils'

const time = formatTime(DateTime.fromISO('2026-05-20T14:30:00'), 'en');
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatTime(date: DateTime, locale?: string): string;
```
