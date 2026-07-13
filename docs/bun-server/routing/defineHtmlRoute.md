---
outline: deep

params:
    - name: path
      description: One route path, or multiple route paths, that should serve the same HTML bundle.
      type: Path | readonly Path[]

    - name: bundle
      description: HTML bundle imported from an `.html` file through Bun.
      type: HTMLBundle

returns: An immutable HTML route definition that can be included in a route collection.
---

# defineHtmlRoute

Creates a route definition for Bun HTML imports. Use it when an HTML file should be served through the package's normal route collection workflow instead of being placed directly in Bun's native `routes` object.

`defineHtmlRoute()` is useful for React and other client-side applications that use Bun's HTML bundling. The imported HTML file remains a native Bun `HTMLBundle`; `compileRoutes()` simply places that bundle at the configured path so Bun can handle asset bundling, generated scripts, stylesheets, development mode, and production caching.

Pass a single path when the bundle should only serve one entry point. Pass a path array when the same frontend should be available from multiple URLs, such as a single-page application that handles client-side routing.

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

<FrontmatterDocs/>

## Type signature

```ts
declare function defineHtmlRoute<const Path extends string>(
    path: Path | readonly Path[],
    bundle: HTMLBundle
): HtmlRouteDefinition<Path>;
```
