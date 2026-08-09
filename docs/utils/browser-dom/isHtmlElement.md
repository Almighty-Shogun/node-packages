---
outline: deep

params:
    - name: element
      description: Value to test.
      type: unknown

returns: '`true` when the value is an `HTMLElement` in the current document context.'
---

# isHtmlElement

Checks whether a value is an `HTMLElement`. It returns `false` when `document` is not available, so it can be called in shared code without throwing during server-side execution.

## Importing

```ts
import { isHtmlElement } from '@almighty-shogun/utils';
```

## Usage

```ts
import { isHtmlElement } from '@almighty-shogun/utils';

const target = document.querySelector('[data-menu]');

if (isHtmlElement(target)) {
    target.focus();
}
```

<FrontmatterDocs/>

## Type signature

```ts
declare function isHtmlElement(element: unknown): element is HTMLElement;
```
