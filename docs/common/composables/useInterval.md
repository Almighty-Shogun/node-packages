---
outline: deep

params:
    - name: ms
      description: Interval duration.
      type: MaybeRef<number>

    - name: fn
      description: Function called by the interval.
      type: Function

returns:
    - name: 'start(): void'
      description: Starts the interval when it is not already running.

    - name: 'stop(): void'
      description: Clears the active interval.
---

# useInterval

Starts an interval when the component mounts, stops it when the component unmounts, and restarts it when the interval duration changes. Use it for polling, clocks, countdowns, or repeated UI updates.

## Importing

```ts
import { useInterval } from '@almighty-shogun/common'
```

## Usage

```ts
import { ref } from 'vue'
import { useInterval } from '@almighty-shogun/common'

const count = ref(0);
const interval = useInterval(1000, () => count.value++);

interval.stop();
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useInterval(
    ms: MaybeRef<number>,
    fn: Function
): UseInterval;

type UseInterval = {
    start(): void;
    stop(): void;
};
```
