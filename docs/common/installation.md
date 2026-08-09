# Installation

`@almighty-shogun/common` ships as ESM and exposes named exports from the package root. Install Vue and Vue Router alongside it because the composables, refs, and route helpers use Vue runtime APIs.

## Install

::: code-group

```sh [Bun]
bun add @almighty-shogun/common vue vue-router
```

```sh [NPM]
npm install @almighty-shogun/common vue vue-router
```

```sh [PNPM]
pnpm add @almighty-shogun/common vue vue-router
```

```sh [Yarn]
yarn add @almighty-shogun/common vue vue-router
```

:::

## Importing

All public APIs are available from the package root.

```ts
import { translate, useIsCurrentRoute } from '@almighty-shogun/common';
```

## Requirements

- Vue 3.5+ for composables and refs.
- Vue Router 5.x for route helpers.
- No translation library. Helpers such as [`translate`](./i18n/translate) and [`translationExists`](./i18n/translationExists) detect Vue I18n automatically when it is installed, and otherwise use whatever instance you pass to [`registerI18n`](./i18n/registerI18n). Any object with `t`/`te` or `$t`/`$te` methods works, so Vue I18n is supported but never imported or required.
