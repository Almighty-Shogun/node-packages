---
outline: deep

params:
    - name: date
      description: Date to format.
      type: DateTime

    - name: isLong
      description: Use long month names when `true`; short names when `false`.
      type: boolean

    - name: locale
      description: Optional locale override.
      type: string

returns: A localized month name. When `isLong` is `true`, the long month form is used; when `false`, the short form is used.
---

# formatMonth

Formats the month from a Luxon `DateTime`. Pass `false` for `isLong` when a compact UI needs abbreviated month names.

## Importing

```ts
import { formatMonth } from '@almighty-shogun/utils'
```

## Usage

```ts
import { DateTime } from 'luxon'
import { formatMonth } from '@almighty-shogun/utils'

const month = formatMonth(DateTime.fromISO('2026-05-20'), false, 'en')

// 'May'
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatMonth(
    date: DateTime,
    isLong?: boolean,
    locale?: string
): string;
```
