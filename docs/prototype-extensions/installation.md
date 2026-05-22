# Installation

Import the package once for side effects. It patches the built-in prototypes at runtime and exposes TypeScript augmentations for `Array`, `String`, and `Number`.

## Install

::: code-group

```sh [Bun]
bun add @almighty-shogun/prototype-extensions
```

```sh [NPM]
npm install @almighty-shogun/prototype-extensions
```

```sh [PNPM]
pnpm add @almighty-shogun/prototype-extensions
```

```sh [Yarn]
yarn add @almighty-shogun/prototype-extensions
```

:::

## Importing

Import this package once in your application entry file, before application code calls any prototype methods. In most Vue/Vite projects that means `main.ts`.

```ts
import App from './App.vue'
import { createApp } from 'vue'
import '@almighty-shogun/prototype-extensions'

createApp(App).mount('#app')
```

## Requirements

- A JavaScript runtime with `Array.prototype.toSpliced` support for `Array.delete`.
- A bundler that keeps side-effect imports.
