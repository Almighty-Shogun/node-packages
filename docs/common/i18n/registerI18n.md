---
outline: deep

params:
    - name: i18n
      description: Instance with `t`, `$t`, `te`, or `$te` methods.
      type: I18n
---


# registerI18n

Registers an i18n-like instance for the module-level translation helpers. The instance may expose composition-style `t` and `te` methods or legacy `$t` and `$te` methods.

The contract is structural, so no translation library is imported or required. Vue I18n satisfies it, and so does any object or plain stub that provides the same methods.

Registration is optional. When Vue I18n is installed on the application, the helpers already find it through `$i18n` on the current component instance, so an app that only calls [`translate`](./translate) from inside components needs no setup at all. Call `registerI18n` when you want one explicit instance instead, or when translation happens outside component setup where auto-detection cannot reach. See [resolution order](./translate#resolution-order).

## Importing

```ts
import { registerI18n } from '@almighty-shogun/common';
```

## Usage

::: code-group

```ts [main.ts]
import { createI18n } from 'vue-i18n';
import { registerI18n } from '@almighty-shogun/common';

const i18n = createI18n({
    locale: 'en',
    messages: {
        en: { navigation: { dashboard: 'Dashboard' } }
    }
});

registerI18n(i18n.global);
```

```ts [stub.ts]
import { registerI18n } from '@almighty-shogun/common';

const messages: Record<string, string> = {
    'navigation.dashboard': 'Dashboard'
};

registerI18n({
    t: key => messages[key] ?? key,
    te: key => key in messages
});
```

:::

<FrontmatterDocs/>

## Type signature

```ts
declare function registerI18n(i18n: I18n): void;

type I18n = {
    t?: Undefinable<Translate>;
    $t?: Undefinable<Translate>;
    te?: Undefinable<TranslateExists>;
    $te?: Undefinable<TranslateExists>;
};

type Translate = (
    key: string,
    params?: Undefinable<TranslationParams>
) => string;
type TranslateExists = (key: string) => boolean;
type TranslationParams = Record<string, unknown> | (string | number)[];
```
