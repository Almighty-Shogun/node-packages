---
outline: deep

params:
    - name: options
      description: CSS Modules class name generation settings.
      type: Options
      optional: true
      defaultValue: '{}'

returns: The Vite plugins that configure CSS Modules class names.
---

# cssModules

Adds Vite plugins that configure CSS Modules and generate scoped class names. It uses mangled names by default, with options for camel-case or kebab-case names, a prefix, or a custom name generator.

## Importing

```ts
import { cssModules } from '@almighty-shogun/vite-preset';
```

## Usage

```ts
import { defineConfig } from 'vite';
import { cssModules } from '@almighty-shogun/vite-preset';

export default defineConfig({
    plugins: [
        cssModules({
            classNames: 'camel',
            prefix: 'app-'
        })
    ]
});
```

<FrontmatterDocs/>

## Type signature

```ts
import type { Plugin } from 'vite';

type Options = {
    readonly classNames?: 'mangled' | 'camel' | 'kebab';
    readonly generateScopeName?: (
        name: string,
        filename: string,
        css: string
    ) => string;
    readonly prefix?: string;
};

declare const cssModules: (options?: Options) => Plugin[];
```
