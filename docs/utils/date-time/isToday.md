---
outline: deep

params:
    - name: dateTime
      description: Date to check.
      type: DateTime

    - name: today
      description: Comparison date.
      type: DateTime
      optional: true

returns: '`true` when both values share the same day.'
---

# isToday

Checks whether a Luxon `DateTime` falls on the same calendar day as another `DateTime`, or today when no comparison value is provided. Pass the optional comparison value in tests to avoid depending on the real clock.

## Importing

```ts
import { isToday } from '@almighty-shogun/utils'
```

## Usage

```ts
import { DateTime } from 'luxon'
import { isToday } from '@almighty-shogun/utils'

const shouldHighlight = isToday(DateTime.now());

// true
```

<FrontmatterDocs/>

## Type signature

```ts
declare function isToday(dateTime: DateTime, today?: DateTime): boolean;
```
