# Installation

`@almighty-shogun/utils` ships as ESM and exposes named exports from the package root. Luxon is a direct dependency, so it is installed automatically. Add it to your own `package.json` as well when application code constructs `DateTime` or `Duration` values to pass into the date helpers.

## Install

::: code-group

```sh [Bun]
bun add @almighty-shogun/utils luxon
```

```sh [NPM]
npm install @almighty-shogun/utils luxon
```

```sh [PNPM]
pnpm add @almighty-shogun/utils luxon
```

```sh [Yarn]
yarn add @almighty-shogun/utils luxon
```

:::

## Importing

All public APIs are available from the package root.

```ts
import {
    formatDate,
    getToday,
    setDarkTheme
} from '@almighty-shogun/utils';
```

## Requirements

- Luxon 3.x for date and duration helpers, resolved through the package dependency. Luxon ships no type declarations of its own, so `@types/luxon` is a dependency too and its types resolve without extra setup.
- A browser environment for DOM helpers such as [`reload`](./browser-dom/reload), [`scrollToTop`](./browser-dom/scrollToTop), and [`disableZoom`](./browser-dom/disableZoom).
