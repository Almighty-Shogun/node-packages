---
outline: deep

params:
    - name: date
      description: Date to compare.
      type: DateTime

returns: '`true` when `date` is earlier than now.'
---

# isBeforeNow

Checks whether a Luxon `DateTime` is earlier than the current moment. Use it for expiration checks, overdue states, and disabling actions after a deadline.

## Importing

```ts
import { isBeforeNow } from '@almighty-shogun/utils'
```

## Usage

```ts
import { DateTime } from 'luxon'
import { isBeforeNow } from '@almighty-shogun/utils'

const expired = isBeforeNow(DateTime.now().minus({ minutes: 1 }));

// true
```

<FrontmatterDocs/>

## Type signature

```ts
declare function isBeforeNow(date: DateTime): boolean;
```
