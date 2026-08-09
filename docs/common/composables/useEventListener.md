---
outline: deep

params:
    - name: source
      description: Element, window, document, Vue component instance, ref, or getter to attach listeners to.
      type: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>

    - name: events
      description: Event name or names to register on the resolved target.
      type: Arrayable<TEvent>

    - name: handler
      description: Listener called for matching events.
      type: '(evt: EventMap[TEvent]) => void'

    - name: options
      description: Native listener options passed to `addEventListener` and `removeEventListener`.
      type: Undefinable<AddEventListenerOptions | boolean>
      optional: true

returns: A dispose function that removes all registered listeners and stops target watching.
---

# useEventListener

Registers one or more DOM event listeners against a reactive target. When the target changes, the old listeners are removed and the same events are attached to the new target.

The composable returns a dispose function and also registers that cleanup with the current Vue effect scope when one exists. In non-browser environments it returns a no-op dispose function.

## Importing

```ts
import { useEventListener } from '@almighty-shogun/common';
```

## Usage

```ts
import { ref } from 'vue';
import { useEventListener } from '@almighty-shogun/common';

const button = ref<HTMLButtonElement | null>(null);

const dispose = useEventListener(button, 'click', event => {
    event.preventDefault();
});

dispose();
```

<FrontmatterDocs/>

## Uses

- [Arrayable](../../utils/types#arrayable)
- [HTMLTarget](../../utils/types#htmltarget)
- [NullableOrUndefinable](../../utils/types#nullableorundefinable)
- [Undefinable](../../utils/types#undefinable)
- [unwrapTarget](../util/unwrapTarget)

## Type signature

```ts
declare function useEventListener<TEvent extends keyof EventMap>(
    source: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>,
    events: Arrayable<TEvent>,
    handler: (evt: EventMap[TEvent]) => void,
    options?: Undefinable<AddEventListenerOptions | boolean>
): UseEventListener;

type UseEventListener = () => void;
type ComponentTarget = HTMLTarget | ComponentPublicInstance;
type EventMap = HTMLElementEventMap & WindowEventMap & DocumentEventMap;
```
