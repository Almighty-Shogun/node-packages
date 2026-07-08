# Installation

The common package ships as ESM and exposes named exports from the package root. Install Vue and Vue Router alongside it because the composables, refs, and route helpers use Vue runtime APIs.

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
import { useOpen, isCurrentRoute, translate } from '@almighty-shogun/common'
```

## Requirements

- Vue 3.5+ for composables and refs.
- Vue Router 4.x for route helpers.
- Vue I18n 11.x when using i18n helpers such as `registerI18n`, `translate`, and `translationExists`.
