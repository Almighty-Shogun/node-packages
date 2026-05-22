---
outline: deep

returns: An array of all configured `Language` objects. The list currently contains English, Dutch, French, German, and Polish metadata.
---

# getLanguages

Returns the full list of supported language metadata. The result can be used to render locale pickers or keep UI language options aligned with the package-supported language list.

## Importing

```ts
import { getLanguages } from '@almighty-shogun/utils'
```

## Usage

```ts
import { getLanguages } from '@almighty-shogun/utils'

const languages = getLanguages()
const codes = languages.map(language => language.code)

// ['en', 'nl', 'fr', 'de', 'pl']
```

<FrontmatterDocs/>

## Type signature

```ts
declare function getLanguages(): Language[];

type Language = {
    name: string;
    code: string;
    flag: {
        plain: string;
        rounded: string;
    };
};
```
