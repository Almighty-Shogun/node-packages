---
outline: deep

params:
    - name: key
      description: Translation key.
      type: string

    - name: params
      description: Translation parameters.
      type: Undefinable<TranslationParams>
      optional: true

returns: The translated string when an i18n instance is registered. Without one, the original key is returned so callers get a predictable fallback.
---

# translate

Translates a key through the active i18n instance, preferring its `t` method and falling back to `$t`. When no instance can be resolved, or the resolved instance exposes neither method, it returns the key unchanged, which keeps tests and non-i18n contexts predictable.

Parameters are only forwarded when supplied, so an instance whose `t` takes a single argument still works.

## Importing

```ts
import { translate } from '@almighty-shogun/common';
```

## Usage

```ts
import { translate } from '@almighty-shogun/common';

const label = translate('navigation.dashboard');
```

## Resolution order

The helper looks for an instance in two places, in this order:

1. The instance passed to [`registerI18n`](./registerI18n), if one is registered.
2. `$i18n` on the current component instance, which is how Vue I18n exposes itself once installed on the application.

An explicit registration therefore wins over auto-detection, so a stub registered in a test is not silently replaced by a real instance that happens to be installed. Auto-detection only resolves during component setup, because it reads the current Vue instance. Calling `translate` from a store, a route guard, or plain module code falls back to the registered instance, which is the main reason to register one.

If neither source resolves, the key is returned as-is.

<FrontmatterDocs/>

## Uses

- [Undefinable](../../utils/types#undefinable)

## Type signature

```ts
declare function translate(
    key: string,
    params?: Undefinable<TranslationParams>
): string;

type TranslationParams = Record<string, unknown> | (string | number)[];
```
