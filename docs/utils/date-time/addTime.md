---
outline: deep

params:
    - name: time
      description: Duration value passed to `DateTime.now().plus()`.
      type: DurationLike

returns: A Luxon `DateTime`.
---

# addTime

Creates a Luxon `DateTime` for the current moment plus the provided duration. It is useful for expiration times, retry windows, temporary UI state, and any code that needs a relative future timestamp.

## Importing

```ts
import { addTime } from '@almighty-shogun/utils'
```

## Usage

```ts
import { addTime } from '@almighty-shogun/utils'

const expiresAt = addTime({ minutes: 15 })
```

<FrontmatterDocs/>

## Type signature

```ts
declare function addTime(time: DurationLike): DateTime;
```
