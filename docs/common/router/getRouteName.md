---
outline: deep

params:
    - name: route
      description: Node the plugin is naming. Its `parent` chain is walked up to the root, so the generated name covers the whole folder path.
      type: TreeNode

returns: The dotted PascalCase name for the route, or `Home` for the root route.
---

# getRouteName

Names file-based routes after their folder path in dotted PascalCase, so `pages/users/[id]/edit.vue` is registered as `Users.Id.Edit`. Pass it to the `getRouteName` option of the Vue Router file-based routing plugin, which calls it once for every node while it builds the route tree.

The plugin's own default names a route after its file path, which gives `/users/[id]/edit`. That reads like a path rather than a name, and it puts brackets and slashes into every `router.push({ name })` call. Dotted names keep a route reference short and let a group of routes be matched by prefix, which is what [`useIsRoute`](./useIsRoute) does with `strict` set to `false`.

Each segment is converted to PascalCase and the segments are joined with `.`, outermost first. Both `-` and `_` separate words inside a segment, and a parameter contributes its parameter name, so `[id]` becomes `Id`. Segments carrying no path contribute nothing: an `index` file collapses into its folder, and a route group such as `(auth)` is skipped, exactly as both disappear from the URL. The root itself is never part of the name, so the one route left with nothing to name, the root `index.vue`, becomes `Home`.

## Importing

```ts
import { getRouteName } from '@almighty-shogun/common';
```

## Usage

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'vue-router/vite';
import { getRouteName } from '@almighty-shogun/common';

export default defineConfig({
    plugins: [
        VueRouter({
            getRouteName
        }),
        vue()
    ]
});
```

## Generated names

```text
pages/index.vue                 Home
pages/users.vue                 Users
pages/users/index.vue           Users
pages/users/[id].vue            Users.Id
pages/users/[id]/edit.vue       Users.Id.Edit
pages/user-settings.vue         UserSettings
pages/(auth)/login.vue          Login
pages/[...slug].vue             Slug
pages/blog/[[category]].vue     Blog.Category
pages/report-[id]-summary.vue   ReportIdSummary
```

A parameter is named after itself and nothing more, so nothing in the name records that it was optional, repeatable, or a catch-all, and a folder that only holds children is named like the `index.vue` inside it.

::: warning
Two files can therefore generate the same name. `[slug].vue` and `[...slug].vue` in one folder both become `Slug`, `[category].vue` and `[[category]].vue` both become `Blog.Category`, and a `users.vue` layout shares `Users` with its own `users/index.vue`. The plugin's other built-in helper, `getPascalCaseRouteName`, separates those cases with `$`, `?`, and a `Parent` suffix. Rename one of the files when the pair is genuinely ambiguous.
:::

<FrontmatterDocs/>

## Type signature

```ts
declare function getRouteName(route: TreeNode): string;
```

`TreeNode` is Vue Router's own build-time type, exported from `vue-router/unplugin`.
