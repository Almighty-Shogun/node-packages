# Installation

The Vue utilities package ships as ESM and expects a Vue 3 application. Vue Router is required for route helpers, while Vue I18n is optional and only needed when using the i18n registry helpers.

## Install

::: code-group

```sh [Bun]
bun add @almighty-shogun/vue-utils vue vue-router
```

```sh [NPM]
npm install @almighty-shogun/vue-utils vue vue-router
```

```sh [PNPM]
pnpm add @almighty-shogun/vue-utils vue vue-router
```

```sh [Yarn]
yarn add @almighty-shogun/vue-utils vue vue-router
```

:::

## Importing

All public APIs are available from the package root.

```ts
import { useOpen, isCurrentRoute, translate } from '@almighty-shogun/vue-utils'
```

## Requirements

- Vue 3.5+ for composables and refs.
- Vue Router 4.x for route helpers.
- Vue I18n 11.x when using `registerI18n`, `translate`, or `translationExists`.
