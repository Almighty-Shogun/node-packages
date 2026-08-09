---
outline: deep

params:
    - name: key
      description: Local-storage key used to persist the website locale.
      type: string
      optional: true
      defaultValue: 'application-locale'

returns:
    - name: locale
      description: Current website locale.
      type: Ref<string>

    - name: 'setLocale(locale: string): void'
      description: Updates the locale ref and applies it to the document.
---

# useWebsiteLocale

Creates persistent website-locale state backed by local storage. Whenever the locale changes, the composable updates the root document language through [`setWebsiteLocale`](../../utils/browser-dom/setWebsiteLocale).

::: warning
The document language is applied by a watcher, so it is written on every locale change but not when the composable first reads the stored value. Call [`setWebsiteLocale`](../../utils/browser-dom/setWebsiteLocale) with `locale.value` during startup when the persisted locale should also be applied on the initial render.
:::

## Importing

```ts
import { useWebsiteLocale } from '@almighty-shogun/common';
```

## Usage

```ts
import { useWebsiteLocale } from '@almighty-shogun/common';

const { locale, setLocale } = useWebsiteLocale();

setLocale('nl');
```

<FrontmatterDocs/>

## Uses

- [setWebsiteLocale](../../utils/browser-dom/setWebsiteLocale)
- [useLocalStorage](./useLocalStorage)

## Type signature

```ts
declare function useWebsiteLocale(key?: string): UseWebsiteLocale;

type UseWebsiteLocale = {
    readonly locale: Ref<string>;

    setLocale(newLocale: string): void;
};
```
