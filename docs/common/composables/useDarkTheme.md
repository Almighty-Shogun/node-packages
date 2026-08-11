---
outline: deep

params:
    - name: key
      description: Local-storage key used to persist the dark-mode state.
      type: string
      optional: true
      defaultValue: 'application-theme'

returns:
    - name: darkMode
      description: Current dark-mode state.
      type: Ref<boolean>

    - name: 'toggle(): void'
      description: Flips `darkMode` and applies the new state to the document.
---

# useDarkTheme

Creates persistent dark-theme state backed by local storage. The returned ref controls whether the document has the `dark` attribute, and `toggle()` flips that state for UI switches or menu actions.

The stored preference is applied as soon as the composable runs, so a visitor who chose dark on a previous visit gets it on the first render without any startup code. It is applied again on every change.

## Importing

```ts
import { useDarkTheme } from '@almighty-shogun/common';
```

## Usage

```ts
import { useDarkTheme } from '@almighty-shogun/common';

const { darkMode, toggle } = useDarkTheme();

toggle();
```

<FrontmatterDocs/>

## Uses

- [setDarkTheme](../../utils/browser-dom/setDarkTheme)
- [useLocalStorage](./useLocalStorage)

## Type signature

```ts
declare function useDarkTheme(key?: string): UseDarkTheme;

type UseDarkTheme = {
    readonly darkMode: Ref<boolean>;

    toggle(): void;
};
```
