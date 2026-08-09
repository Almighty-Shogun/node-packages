---
outline: deep

params:
    - name: locale
      description: Locale to apply. Falls back to document or navigator language, or `en`.
      type: Undefinable<string>
      optional: true
---

# setWebsiteLocale

Sets the root HTML `lang` attribute. When no locale is provided, the helper falls back to the current document language, browser language, or `en`.

## Importing

```ts
import { setWebsiteLocale } from '@almighty-shogun/utils';
```

## Usage

```ts
import { setWebsiteLocale } from '@almighty-shogun/utils';

setWebsiteLocale('nl');

// <html lang="nl">
```

<FrontmatterDocs/>

## Uses

- [Undefinable](../types#undefinable)

## Type signature

```ts
declare function setWebsiteLocale(locale?: Undefinable<string>): void;
```
