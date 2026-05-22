# Installation

The utilities package ships as ESM and exposes named exports from the package root. Install `luxon` alongside it because date and duration helpers use Luxon types and runtime APIs.

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
import { formatDate, getToday, setDarkTheme } from '@almighty-shogun/utils'
```

## Requirements

- Luxon 3.x for date and duration helpers.
- A browser environment for DOM helpers such as `reload`, `scrollToTop`, and `disableZoom`.
