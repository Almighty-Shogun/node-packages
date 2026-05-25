---
outline: deep

params:
    - name: date
      description: Date to format.
      type: DateTime

    - name: isLong
      description: Use long weekday names when `true`; short names when `false`.
      type: boolean
      defaultValue: 'true'

    - name: locale
      description: Locale override.
      type: string
      optional: true

returns: A localized weekday name. When `isLong` is `true`, the long weekday form is used; when `false`, the short form is used.
---

# formatWeekday

Formats the weekday from a Luxon `DateTime`. Pass `false` for `isLong` to use short weekday names in compact layouts.

## Importing

```ts
import { formatWeekday } from '@almighty-shogun/utils'
```

## Usage

```ts
import { DateTime } from 'luxon'
import { formatWeekday } from '@almighty-shogun/utils'

const weekday = formatWeekday(DateTime.fromISO('2026-05-20'), true, 'en');
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatWeekday(
    date: DateTime,
    isLong: boolean,
    locale?: string
): string;
```
