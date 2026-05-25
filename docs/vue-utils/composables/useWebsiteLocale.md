---
outline: deep

returns:
    - name: locale
      description: Current website locale.
      type: Ref<string>

    - name: 'setLocale(locale: string): void'
      description: Updates the locale ref and applies it to the document.
---

# useWebsiteLocale

Creates persistent website-locale state backed by local storage. Whenever the locale changes, the composable updates the root document language through `setWebsiteLocale`.

## Importing

```ts
import { useWebsiteLocale } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { useWebsiteLocale } from '@almighty-shogun/vue-utils'

const { locale, setLocale } = useWebsiteLocale();

setLocale('nl');
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useWebsiteLocale(): UseWebsiteLocale;

type UseWebsiteLocale = {
    readonly locale: Ref<string>;

    setLocale(newLocale: string): void;
};
```


## Uses

- [setWebsiteLocale](/utils/browser-dom/setWebsiteLocale)
