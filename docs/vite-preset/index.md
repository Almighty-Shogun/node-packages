# Vite Preset

`@almighty-shogun/vite-preset` provides CSS Modules class name generation for Vite projects. Its `cssModules` plugin supports mangled, camel-case, and kebab-case names, plus a custom generator and prefix.

## Exports

- [cssModules](./cssModules) &mdash; configures CSS Modules class name generation.

## Dependencies

- `vite` &mdash; a peer dependency required by the project that loads the preset. The supported range is `^8.3.4`.
- `vite-css-modules`, `change-case`, and `css-class-generator` &mdash; direct dependencies used to patch CSS Modules and generate scoped class names.

## Quick example

```ts
import { defineConfig } from 'vite';
import { cssModules } from '@almighty-shogun/vite-preset';

export default defineConfig({
    plugins: [
        cssModules()
    ]
});
```

Continue with [installation](./installation) or see the [cssModules options](./cssModules).
