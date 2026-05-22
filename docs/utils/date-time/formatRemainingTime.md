---
outline: deep

params:
    - name: time
      description: Duration object passed to `Duration.fromObject()`.
      type: DurationLikeObject

returns: A compact formatRemainingTime string containing at most two units, such as `3w 2d`, `4h 15m`, or `1m` for empty or very small durations.
---

# formatRemainingTime

Formats a duration-like object into a compact countdown-style label using the two largest non-zero units. It normalizes the duration through Luxon and falls back to `1m` so very small or empty durations still produce a useful label.

## Importing

```ts
import { formatRemainingTime } from '@almighty-shogun/utils'
```

## Usage

```ts
import { formatRemainingTime } from '@almighty-shogun/utils'

const remaining = formatRemainingTime({ days: 2, hours: 4, minutes: 30 })

// '2d 4h'
```

<FrontmatterDocs/>

## Type signature

```ts
declare function formatRemainingTime(time: DurationLikeObject): string;
```
