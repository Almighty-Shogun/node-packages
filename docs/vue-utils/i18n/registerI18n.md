---
outline: deep

params:
    - name: i18n
      description: Instance with `t`, `$t`, `te`, or `$te` methods.
      type: I18n
---

# registerI18n

Registers an i18n-like instance for the module-level translation helpers. The instance may expose composition-style `t` and `te` methods or legacy `$t` and `$te` methods.

## Importing

```ts
import { registerI18n } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { registerI18n } from '@almighty-shogun/vue-utils'

registerI18n(i18n.global);
```

<FrontmatterDocs/>

## Type signature

```ts
declare function registerI18n(i18n: I18n): void;
```
