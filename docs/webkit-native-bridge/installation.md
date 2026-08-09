# Installation

`@almighty-shogun/webkit-native-bridge` ships as ESM and depends only on [`@almighty-shogun/utils`](../utils/) for shared utility types, which it uses at type level only. It is designed for JavaScript running inside a WebKit host that exposes `window.webkit.messageHandlers`.

## Install

::: code-group

```sh [Bun]
bun add @almighty-shogun/webkit-native-bridge
```

```sh [NPM]
npm install @almighty-shogun/webkit-native-bridge
```

```sh [PNPM]
pnpm add @almighty-shogun/webkit-native-bridge
```

```sh [Yarn]
yarn add @almighty-shogun/webkit-native-bridge
```

:::

## Importing

All public APIs are available from the package root.

```ts
import { createNativeBridge } from '@almighty-shogun/webkit-native-bridge';
```

## Requirements

- A WebKit host application that registers a message handler.
- Native code that dispatches response events back into the page.
- A browser-like `window` object for runtime bridge communication.
