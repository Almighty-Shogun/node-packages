---
outline: deep

params:
    - name: key
      description: Translation key.
      type: string

    - name: params
      description: Optional translation parameters.
      type: TranslationParams

returns: The translated string when an i18n instance is registered. Without one, the original key is returned so callers get a predictable fallback.
---

# translate

Translates a key through the registered i18n instance. If no instance is registered, it returns the key unchanged, which keeps tests and non-i18n contexts predictable.

## Importing

```ts
import { translate } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { translate } from '@almighty-shogun/vue-utils'

const label = translate('navigation.dashboard');
```

<FrontmatterDocs/>

## Type signature

```ts
declare function translate(
    key: string,
    params?: TranslationParams
): string;
```
