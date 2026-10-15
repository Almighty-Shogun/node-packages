# Installation

`@almighty-shogun/vite-preset` is an ESM package for Vite projects. Vite is a peer dependency and must be installed alongside the preset.

## Install

::: code-group

```sh [Bun]
bun add -d @almighty-shogun/vite-preset vite
```

```sh [NPM]
npm install -D @almighty-shogun/vite-preset vite
```

```sh [PNPM]
pnpm add -D @almighty-shogun/vite-preset vite
```

```sh [Yarn]
yarn add -D @almighty-shogun/vite-preset vite
```

:::

## Importing

All public APIs are available from the package root.

```ts
import { cssModules } from '@almighty-shogun/vite-preset';
```

## Configure

Add `cssModules` to the Vite configuration's plugin list:

```ts
import { defineConfig } from 'vite';
import { cssModules } from '@almighty-shogun/vite-preset';

export default defineConfig({
    plugins: [
        cssModules()
    ]
});
```
