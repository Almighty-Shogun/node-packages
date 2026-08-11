---
outline: deep

params:
    - name: targets
      description: Element, component instance, or array of targets that count as inside the clickable area.
      type: Arrayable<MaybeRefOrGetter<NullableOrUndefinable<ComponentElement>>>

    - name: callback
      description: Handler called for pointerdown events that happen outside every target.
      type: OutsideClickHandler

    - name: enabled
      description: Reactive flag or getter that controls whether outside clicks are handled.
      type: MaybeRefOrGetter<boolean>
      optional: true
      defaultValue: 'true'

returns: A dispose function that removes the pointer listener.
---

# useClickOutside

Registers a `pointerdown` listener and calls a handler when the event path does not include any target element. It accepts raw `HTMLElement` values and Vue component instances.

The listener is created through [`useEventListener`](./useEventListener), so it is automatically disposed with the current Vue effect scope when one exists. Call the returned function when manual cleanup is needed. In non-browser contexts, it returns a no-op dispose function.

## Importing

```ts
import { useClickOutside } from '@almighty-shogun/common';
```

## Usage

```vue
<template>
    <aside ref="panel">
        <button @click="close">Close</button>
    </aside>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { useClickOutside } from '@almighty-shogun/common';

const panel = useTemplateRef<HTMLElement>('panel');

function close(): void {
    // Close the panel.
}

useClickOutside(panel, close);
</script>
```

<FrontmatterDocs/>

## Uses

- [Arrayable](../../utils/types#arrayable)
- [NullableOrUndefinable](../../utils/types#nullableorundefinable)
- [Promisable](../../utils/types#promisable)
- [unwrapElement](../util/unwrapElement)
- [useEventListener](./useEventListener)

## Type signature

```ts
declare function useClickOutside(
    targets: Arrayable<
        MaybeRefOrGetter<NullableOrUndefinable<ComponentElement>>
    >,
    callback: OutsideClickHandler,
    enabled?: MaybeRefOrGetter<boolean>
): UseClickOutside;

type UseClickOutside = () => void;
type ComponentElement = HTMLElement | ComponentPublicInstance;
type OutsideClickHandler = (event: PointerEvent) => Promisable<void>;
```
