# Installation

The bridge package ships as ESM and has no runtime dependencies. It is designed for JavaScript running inside a WebKit host that exposes `window.webkit.messageHandlers`.

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
import { createNativeBridge, normalizeBridgeResponse } from '@almighty-shogun/webkit-native-bridge'
```

## Requirements

- A WebKit host application that registers a message handler.
- Native code that dispatches response events back into the page.
- A browser-like `window` object for runtime bridge communication.
