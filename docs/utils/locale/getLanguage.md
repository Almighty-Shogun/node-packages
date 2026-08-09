---
outline: deep

params:
    - name: code
      description: Language code such as `en`, `nl`, `fr`, `de`, or `pl`.
      type: LanguageCode

returns: A `Nullable<Language>` for known language codes. The object contains the display name, language code, and flag asset paths.
---

# getLanguage

Looks up one supported language by code and returns its display metadata. Use this when rendering a language selector, showing the active language, or mapping a stored locale code back to a user-facing label.

## Importing

```ts
import { getLanguage } from '@almighty-shogun/utils';
```

## Usage

```ts
import { getLanguage } from '@almighty-shogun/utils';

const language = getLanguage('nl');

// { name: 'Dutch', code: 'nl', flag: { ... } }
```

<FrontmatterDocs/>

## Uses

- [Nullable](../types#nullable)

## Type signature

```ts
declare function getLanguage(code: LanguageCode): Nullable<Language>;

type Language = {
    name: string;
    code: string;
    flag: {
        plain: string;
        rounded: string;
    };
};
```
