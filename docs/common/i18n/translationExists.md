---
outline: deep

params:
    - name: key
      description: Base translation key.
      type: string

    - name: subKeys
      description: Subkeys that must all exist under the base key.
      type: string[]
      optional: true
      defaultValue: '[]'

returns: '`true` when the registered i18n instance reports that the key exists. When `subKeys` are provided, all nested keys must exist.'
---

# translationExists

Checks whether a translation key exists through the active i18n instance, preferring its `te` method and falling back to `$te`. When `subKeys` are provided, every nested key must exist for the function to return `true`.

The instance is resolved the same way as in [`translate`](./translate#resolution-order): a registered instance first, then `$i18n` on the current component instance. If neither resolves, or the resolved instance exposes neither method, the helper always returns `false`.

## Importing

```ts
import { translationExists } from '@almighty-shogun/common';
```

## Usage

```ts
import { translationExists } from '@almighty-shogun/common';

const hasMenuTranslations = translationExists('nav', ['dashboard', '..']);
```

<FrontmatterDocs/>

## Type signature

```ts
declare function translationExists(
    key: string,
    subKeys?: string[]
): boolean;
```
