---
outline: deep

params:
    - name: elementRef
      description: Element, component instance, ref, or getter to resolve.
      type: MaybeRefOrGetter<NullableOrUndefinable<ComponentElement>>

returns: The resolved element or `null`.
---

# unwrapElement

Resolves a possibly reactive element target into an `HTMLElement`. Raw elements are returned as-is, Vue component instances are resolved through `$el`, and empty values return `null`.

Use it when a composable accepts either plain DOM nodes or Vue component refs but needs a DOM element internally.

## Importing

```ts
import { unwrapElement } from '@almighty-shogun/common';
```

## Usage

```ts
import { ref } from 'vue';
import { unwrapElement } from '@almighty-shogun/common';

const panel = ref<HTMLElement | null>(null);
const element = unwrapElement(panel);
```

<FrontmatterDocs/>

## Uses

- [Nullable](../../utils/types#nullable)
- [NullableOrUndefinable](../../utils/types#nullableorundefinable)
- [isHtmlElement](../../utils/browser-dom/isHtmlElement)

## Type signature

```ts
declare function unwrapElement<TElement extends HTMLElement>(
    elementRef: MaybeRefOrGetter<NullableOrUndefinable<ComponentElement>>
): Nullable<TElement>;

type ComponentElement = HTMLElement | ComponentPublicInstance;
```
