---
outline: deep

params:
    - name: element
      description: Scrollable element to move back to the top. When omitted, the current window is scrolled.
      type: HTMLElement
      optional: true
---

# scrollToTop

Smoothly scrolls a page or scrollable element back to the top. When no element is provided, it scrolls the current window. Pass an `HTMLElement` when the scroll position belongs to a sidebar, modal body, panel, or another contained scrolling area.

The helper always uses native smooth scrolling with `top: 0`, so it is useful after route changes, pagination changes, filter resets, or workflows where the user should return to the beginning of a view.

## Importing

```ts
import { scrollToTop } from '@almighty-shogun/utils'
```

## Usage

```ts
import { scrollToTop } from '@almighty-shogun/utils'

scrollToTop();
```

```ts
import { scrollToTop } from '@almighty-shogun/utils'

const sidebar = document.getElementsByClassName('VPSidebar')[0] as HTMLElement | undefined;

if (sidebar) {
    scrollToTop(sidebar);
}
```

<FrontmatterDocs/>

## Type signature

```ts
declare function scrollToTop(element?: HTMLElement): void;
```
