---
outline: deep

params:
    - name: element
      description: Scrollable element to move back to the top. When omitted, the current window is scrolled.
      type: Undefinable<HTMLElement>
      optional: true

    - name: options
      description: Native scroll options passed to the target.
      type: Undefinable<ScrollToOptions>
      optional: true
---

# scrollToTop

Scrolls a page or scrollable element. When no element is provided, it scrolls the current window. Pass an `HTMLElement` when the scroll position belongs to a sidebar, modal body, panel, or another contained scrolling area.

When `options` is omitted, the helper uses `{ top: 0, behavior: 'smooth' }`, so it is useful after route changes, pagination changes, filter resets, or workflows where the user should return to the beginning of a view.

## Importing

```ts
import { scrollToTop } from '@almighty-shogun/utils';
```

## Usage

::: code-group

```ts [page.ts]
import { scrollToTop } from '@almighty-shogun/utils';

scrollToTop();
```

```ts [sidebar.ts]
import { scrollToTop } from '@almighty-shogun/utils';

const sidebars = document.getElementsByClassName('VPSidebar');
const sidebar = sidebars[0] as HTMLElement | undefined;

if (sidebar) {
    scrollToTop(sidebar);
}
```

:::

<FrontmatterDocs/>

## Uses

- [Undefinable](../types#undefinable)

## Type signature

```ts
declare function scrollToTop(
    element?: Undefinable<HTMLElement>,
    options?: Undefinable<ScrollToOptions>
): void;
```
