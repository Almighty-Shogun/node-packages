---
outline: deep

params:
    - name: isDark
      description: Whether the dark attribute should be present.
      type: boolean
---

# setDarkTheme

Adds or removes the `dark` attribute on the root HTML element. This pairs well with CSS selectors that use `html[dark]` or `[dark]` to activate a dark theme.

## Importing

```ts
import { setDarkTheme } from '@almighty-shogun/utils'
```

## Usage

```ts
import { setDarkTheme } from '@almighty-shogun/utils'

setDarkTheme(true)

// <html dark>
```

<FrontmatterDocs/>

## Type signature

```ts
declare function setDarkTheme(isDark: boolean): void;
```
