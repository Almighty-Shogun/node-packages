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

::: warning
The document attribute is applied by a watcher, so it is written whenever `darkMode` changes but not when the composable first reads the stored value. Call [`setDarkTheme`](../../utils/browser-dom/setDarkTheme) with `darkMode.value` during startup when the persisted theme should also be applied on the initial render.
:::

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
