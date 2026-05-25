---
outline: deep

returns:
    - name: darkMode
      description: Current dark-mode state.
      type: Ref<boolean>

    - name: 'toggle(): void'
      description: Flips `darkMode` and applies the new state to the document.
---

# useDarkTheme

Creates persistent dark-theme state backed by local storage. The returned ref controls whether the document has the `dark` attribute, and `toggle()` flips that state for UI switches or menu actions.

## Importing

```ts
import { useDarkTheme } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { useDarkTheme } from '@almighty-shogun/vue-utils'

const { darkMode, toggle } = useDarkTheme();

toggle();
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useDarkTheme(): UseDarkTheme;

type UseDarkTheme = {
    readonly darkMode: Ref<boolean>;

    toggle(): void;
};
```

## Uses

- [setDarkTheme](/utils/browser-dom/setDarkTheme)
