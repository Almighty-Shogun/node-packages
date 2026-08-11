---
outline: deep

params:
    - name: path
      description: One route path, or multiple route paths, that should serve the same HTML bundle.
      type: Arrayable<Path>

    - name: bundle
      description: HTML bundle imported from an `.html` file through Bun.
      type: HTMLBundle

returns: An immutable HTML route definition that can be included in a route collection.
---

# defineHtmlRoute

Creates a route definition for a Bun HTML import, so an HTML file can be served through the normal route collection instead of being placed directly in Bun's native `routes` object.

## Importing

```ts
import { defineHtmlRoute } from '@almighty-shogun/bun-server';
```

## Usage

::: code-group

```ts [routes/app.ts]
import app from '../public/app.html';
import { defineHtmlRoute } from '@almighty-shogun/bun-server';

export default defineHtmlRoute(['/', '/route-1', '/route-2'], app);
```

```ts [routes/index.ts]
export { default as app } from './app';
```

```ts [server.ts]
import * as routes from './routes';
import { createServer } from '@almighty-shogun/bun-server';

createServer({
    port: 3000,
    routes
});
```

:::

## Paths

Pass a single path when the bundle serves one entry point, or a path array when the same frontend should answer several URLs, such as a single-page application handling its own client-side routing.

The returned object is frozen, so a definition is static configuration once created. A path array is copied in, so later changes to the array you passed do not affect the route.

## Bundling

The imported HTML file stays a native Bun `HTMLBundle`. [`compileRoutes()`](./compileRoutes) only places that bundle at the configured path, so Bun keeps handling asset bundling, generated scripts, stylesheets, development mode, and production caching. That makes this the entry point for React and other client-side applications using Bun's HTML bundling.

<FrontmatterDocs/>

## Uses

- [Arrayable](../../utils/types#arrayable)

## Type signature

```ts
declare function defineHtmlRoute<const Path extends string>(
    path: Arrayable<Path>,
    bundle: HTMLBundle
): HtmlRouteDefinition<Path>;
```
