---
outline: deep

returns: '`true` when the browser reports a reduced-motion preference.'
---

# prefersReducedMotion

Reads the browser `prefers-reduced-motion: reduce` media query. It returns `false` when `window.matchMedia` is unavailable.

## Importing

```ts
import { prefersReducedMotion } from '@almighty-shogun/utils';
```

## Usage

```ts
import { prefersReducedMotion } from '@almighty-shogun/utils';

const animationDuration = prefersReducedMotion() ? 0 : 200;
```

<FrontmatterDocs/>

## Type signature

```ts
declare function prefersReducedMotion(): boolean;
```
