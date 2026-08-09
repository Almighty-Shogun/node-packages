---
outline: deep
---

# clearRegisteredI18n

Clears the instance registered with [`registerI18n`](./registerI18n). Use it in tests, app teardown, or any environment where the module-level translation instance should be reset.

Clearing removes only the explicit registration. [`translate`](./translate) and [`translationExists`](./translationExists) fall back to auto-detection, so inside component setup they resolve `$i18n` again when Vue I18n is installed. Outside component setup, or without Vue I18n, they return keys unchanged and `false` respectively until a new instance is registered.

## Importing

```ts
import { clearRegisteredI18n } from '@almighty-shogun/common';
```

## Usage

```ts
import { clearRegisteredI18n } from '@almighty-shogun/common';

clearRegisteredI18n();
```

<FrontmatterDocs/>

## Type signature

```ts
declare function clearRegisteredI18n(): void;
```
