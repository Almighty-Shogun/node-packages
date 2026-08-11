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

The stored locale is applied as soon as the composable runs, so the document language matches a returning visitor's choice on the first render without any startup code. It is applied again on every change.

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
