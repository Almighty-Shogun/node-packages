---
outline: deep

params:
    - name: ms
      description: Milliseconds to wait.
      type: number

returns: A promise that resolves with no value.
---

# delay

Returns a promise that resolves after the requested number of milliseconds. Use it in async flows for small waits, UI timing, retry delays, or tests that need to pause between steps.

## Importing

```ts
import { delay } from '@almighty-shogun/utils'
```

## Usage

```ts
import { delay } from '@almighty-shogun/utils'

await delay(300)

// continue after 300ms
```

<FrontmatterDocs/>

## Type signature

```ts
declare function delay(ms: number): Promise<void>;
```
