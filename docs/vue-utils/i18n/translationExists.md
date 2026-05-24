---
outline: deep

params:
    - name: key
      description: Base translation key.
      type: string

    - name: subKeys
      description: Optional subkeys that must all exist under the base key.
      type: string[]

returns: '`true` when the registered i18n instance reports that the key exists. When `subKeys` are provided, all nested keys must exist.'
---

# translationExists

Checks whether a translation key exists through the registered i18n instance. When `subKeys` are provided, every nested key must exist for the function to return `true`.

## Importing

```ts
import { translationExists } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { translationExists } from '@almighty-shogun/vue-utils'

const hasMenuTranslations = translationExists('navigation', ['dashboard', 'settings']);
```

<FrontmatterDocs/>

## Type signature

```ts
declare function translationExists(
    key: string,
    subKeys?: string[]
): boolean;
```
