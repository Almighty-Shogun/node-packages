---
outline: deep

returns: '`true` when the browser reports a dark color-scheme preference.'
---

# prefersDarkScheme

Reads the browser `prefers-color-scheme: dark` media query. It returns `false` when `window.matchMedia` is unavailable.

## Importing

```ts
import { prefersDarkScheme } from '@almighty-shogun/utils';
```

## Usage

```ts
import { prefersDarkScheme, setDarkTheme } from '@almighty-shogun/utils';

setDarkTheme(prefersDarkScheme());
```

<FrontmatterDocs/>

## Type signature

```ts
declare function prefersDarkScheme(): boolean;
```
