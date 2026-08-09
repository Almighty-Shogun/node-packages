---
outline: deep

params:
    - name: target
      description: Scrollable element, window, document, or Vue component instance to observe. When omitted, the document is observed.
      type: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>
      optional: true

returns:
    - name: scrollX
      description: Current horizontal scroll position.
      type: Ref<number>

    - name: scrollY
      description: Current vertical scroll position.
      type: Ref<number>
---

# useScrollPosition

Tracks the scroll position of a window, document, or element. It updates on scroll events and when the resolved target changes.

In non-browser environments the composable returns zeroed refs and does not register listeners.

## Importing

```ts
import { useScrollPosition } from '@almighty-shogun/common';
```

## Usage

```vue
<template>
    <main ref="content">
        <p>Scrolled {{ scrollY }} pixels</p>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useScrollPosition } from '@almighty-shogun/common';

const content = ref<HTMLElement | null>(null);
const { scrollY } = useScrollPosition(content);
</script>
```

<FrontmatterDocs/>

## Uses

- [HTMLTarget](../../utils/types#htmltarget)
- [NullableOrUndefinable](../../utils/types#nullableorundefinable)
- [unwrapTarget](../util/unwrapTarget)
- [useEventListener](./useEventListener)

## Type signature

```ts
declare function useScrollPosition(
    target?: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>
): UseScrollPosition;

type ComponentTarget = HTMLTarget | ComponentPublicInstance;
type UseScrollPosition = {
    readonly scrollX: Ref<number>;
    readonly scrollY: Ref<number>;
};
```
