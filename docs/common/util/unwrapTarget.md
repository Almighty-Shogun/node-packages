---
outline: deep

params:
    - name: target
      description: Event target, component instance, ref, or getter to resolve.
      type: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>

returns: The resolved DOM event target or `null`.
---

# unwrapTarget

Resolves a possibly reactive target into an object that can receive DOM event listeners. It accepts elements, `window`, `document`, and Vue component instances.

Component instances are resolved through `$el`. Empty values return `null`.

## Importing

```ts
import { unwrapTarget } from '@almighty-shogun/common';
```

## Usage

```ts
import { ref } from 'vue';
import { unwrapTarget } from '@almighty-shogun/common';

const target = ref<HTMLElement | null>(null);
const resolved = unwrapTarget(target);
```

<FrontmatterDocs/>

## Uses

- [HTMLTarget](../../utils/types#htmltarget)
- [Nullable](../../utils/types#nullable)
- [NullableOrUndefinable](../../utils/types#nullableorundefinable)
- [isHtmlElement](../../utils/browser-dom/isHtmlElement)

## Type signature

```ts
declare function unwrapTarget(
    target: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>
): Nullable<HTMLTarget>;

type ComponentTarget = HTMLTarget | ComponentPublicInstance;
```
