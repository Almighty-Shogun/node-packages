# Documentation Instructions

Use this file as the source of truth when creating or updating documentation in this repository.

## Objective

Maintain complete, consistent VitePress documentation for every public package export.

The documentation must:

- Document only public exports.
- Give every exported function, class, composable, or prototype method its own page.
- Document all public types for a package in one `docs/<package>/types.md` page. Do not create one page per type.
- Explain behavior in enough depth that a reader can use the export without reading its implementation.
- Include copy-paste-ready usage.
- Match the existing structure, writing style, frontmatter, menus, and formatting.
- Follow the project-root `.editorconfig` for documentation files and all code examples.

Do not combine unrelated runtime exports into one large API page.

## Formatting And Code Style

Follow the project-root `.editorconfig` for formatting and code style. This applies to documentation source and fenced code examples.

For TypeScript examples:

- Use semicolons on import declarations and executable statements.
- Use the repository quote, spacing, brace, and wrapping style.
- Use `_` for the first unused callback/function parameter in examples, `__` for the second unused parameter, `___` for the third, and so on. Do not use descriptive placeholder names such as `_request` when the parameter is not used.
- Keep examples formatted like code that could be pasted into the actual package source or an application.

Do not add semicolons to Vue template markup, shell commands, JSON, YAML, or prose.

## Source Of Truth

Read the package source before writing documentation.

Check:

1. The package entry point and barrel exports.
2. The implementation.
3. Exported TypeScript declarations.
4. Default values and fallback behavior.
5. Other public exports used internally.
6. Existing documentation for related APIs.

Do not document internal, unexported helpers.

Do not infer signatures from examples when the source provides the exact declaration.

## Documentation Location

Package documentation lives directly under `docs/<package>/`.

Examples:

```text
docs/utils/
docs/common/
docs/prototype-extensions/
docs/webkit-native-bridge/
docs/bun-server/
```

Do not create `docs/packages/<package>/`.

Group pages by meaningful API category without repeating unnecessary path segments:

```text
docs/common/composables/useOpen.md
docs/common/refs/localStorageRef.md
docs/utils/date-time/formatDate.md
docs/webkit-native-bridge/types.md
```

Prefer:

```text
common/composables/useOpen.md
```

over:

```text
common/composables/use/open.md
```

Use deeper grouping only when it provides a real runtime API category, such as:

```text
common/composables/*.md
utils/date-time/*.md
```

Do not use deeper grouping for public types. Put all public types for a package in `docs/<package>/types.md`.

## Package Pages

Every package should have:

```text
docs/<package>/index.md
docs/<package>/installation.md
```

Packages with public TypeScript types should also have:

```text
docs/<package>/types.md
```

Place the Types link in the package's first sidebar group directly below Installation.

The introduction page should explain:

- What the package provides.
- Its intended use cases.
- Its main categories.
- Important runtime or framework requirements.

Use `&mdash;` in category lists instead of a plain dash where a descriptive separator is needed.

The installation page should contain actual installation and setup information. Do not add a redundant "Next step" section.

## Type Pages

Use one type page per package:

```text
docs/<package>/types.md
```

The page must document every public exported type for that package. Give every type its own heading, a useful description, and the exact source signature.

Do not create individual pages such as:

```text
docs/webkit-native-bridge/types/native/NativeBridge.md
docs/bun-server/types/router/RouteHandler.md
```

Use this order:

````md
---
outline: deep
---

# Types

Shared TypeScript types exported by `@almighty-shogun/package-name`.

## TypeName

Description of what the type represents and when callers use it.

```ts
type TypeName = {
    value: string;
};
```
````

Type pages do not use `<FrontmatterDocs/>`; prose and signatures are clearer for dense type reference pages.

## API Page Schema

Use this order:

````md
---
outline: deep

params:
    - name: value
      description: Value to process.
      type: string

returns: Description of the returned value.
---

# exportName

Detailed description.

## Importing

```ts
import { exportName } from '@almighty-shogun/package-name';
```

## Usage

```ts
import { exportName } from '@almighty-shogun/package-name';

const result = exportName('value');
```

<FrontmatterDocs/>

## Type signature

```ts
declare function exportName(value: string): string;
```
````

Omit sections that do not apply:

- Omit `params` when there are no parameters.
- Omit `returns` when the function returns `void` and does not expose returned members.
- Omit `## Importing` for individual `prototype-extensions` pages.
- Do not add empty sections.
- Do not inline exported type definitions into function pages when the type is documented in the package `types.md`; reference the type by name in signatures.

Do not add "Package", "Category", "Overview", or low-value "Details" sections to API pages.

Merge useful implementation details into the main description.

## Frontmatter Parameters

Each parameter supports:

```yaml
- name: value
  description: Value to process.
  type: string
  optional: true
  defaultValue: 'example'
```

Follow these rules exactly:

### Type

Always provide `type` when the parameter or generic type has a meaningful type.

Examples:

```yaml
type: string
type: any
type: string | number
type: NativeBridgeRequestMap
type: keyof TRequests
```

Use spaces around union separators:

```yaml
type: string | number
```

Do not write:

```yaml
type: string|number
type: string, number
```

Use `any` when the generic can accept any value. Use the actual constraint when one exists, such as `string` or `NativeBridgeRequestMap`.

### Optional

Set:

```yaml
optional: true
```

only when the documented source declaration uses `?`.

Example:

```ts
function format(value: string, locale?: string): string;
```

The `locale` parameter is optional.

A default value does not automatically mean `optional: true`.

Example:

```ts
function limit(length: number, suffix: string | null = null): string;
```

The `suffix` parameter has a default value, but it is not marked optional because its declaration does not use `?`.

### Default Values

Add `defaultValue` when a default is defined in the parameter declaration or implementation.

Always store it as a quoted YAML string:

```yaml
defaultValue: 'null'
defaultValue: 'false'
defaultValue: '5'
defaultValue: 'EUR'
defaultValue: 'unknown'
```

Optionality and default values are independent metadata.

Do not repeat this metadata in the description.

Bad:

```yaml
description: Initial number of items per page. Defaults to `5`.
defaultValue: '5'
```

Good:

```yaml
description: Initial number of items per page.
defaultValue: '5'
```

Likewise, do not begin a description with "Optional" when `optional: true` already communicates that fact.

## Frontmatter Returns

Use a string for a single returned value:

```yaml
returns: A localized date string.
```

Use a list when a composable or factory returns multiple members:

```yaml
returns:
    - name: isOpen
      description: Current open state.
      type: Ref<boolean>

    - name: 'open(): void'
      description: Opens the controlled element.
```

Callable members must use TypeScript method syntax in `name`:

```yaml
name: 'setTotal(total: number): void'
name: 'load<T>(task: Promise<T> | (() => Promise<T>)): Promise<T>'
```

Do not split a callable into a partial name and duplicated function type:

```yaml
# Incorrect
- name: setTotal(total)
  type: '(total: number) => void'
```

Do not use arrow syntax for returned object methods:

```yaml
# Incorrect
name: 'setTotal(total: number) => void'
```

## Descriptions

Descriptions must explain:

- What the export does.
- When it is useful.
- Important behavior and side effects.
- Fallback behavior.
- Mutation, persistence, caching, or runtime implications where relevant.
- Relevant limitations.

Avoid dry one-sentence descriptions that merely restate the name.

Do not duplicate parameter optionality or defaults in prose when frontmatter already displays them.

Keep descriptions precise. Do not claim behavior that is not present in the implementation.

## Importing And Usage

Every normal API page should show the package import.

Usage examples must also import the documented export so they are copy-paste ready:

```ts
import { formatDate } from '@almighty-shogun/utils';
import { DateTime } from 'luxon';

const label = formatDate(DateTime.now(), 'en');
```

Do not insert a blank line between imports from this monorepo and imports from external packages.

Order imports by line length when practical and consistent with the surrounding documentation.

TypeScript imports and executable statements in usage examples should end with semicolons.

Do not add semicolons to Vue template markup.

### Vue Examples

Vue examples must place `<template>` before `<script>`:

```vue
<template>
    <button @click="open">Open</button>
</template>

<script setup lang="ts">
import { useOpen } from '@almighty-shogun/common';

const { open } = useOpen();
</script>
```

### Prototype Extensions

Individual `prototype-extensions` pages should not contain `## Importing`.

Usage examples should not repeat the package side-effect import. The installation page must explain that the package should be imported once from `main.ts`:

```ts
import '@almighty-shogun/prototype-extensions';
```

Use only the TypeScript version when the JavaScript example would be identical.

## Code Groups

Use `::: code-group` whenever examples represent alternatives or multiple related files.

Installation example:

````md
::: code-group

```sh [Bun]
bun add package-name
```

```sh [NPM]
npm install package-name
```

```sh [PNPM]
pnpm add package-name
```

```sh [Yarn]
yarn add package-name
```

:::
````

Multiple files:

````md
::: code-group

```ts [nativeBridge.ts]
// TypeScript code
```

```cpp [bridgeHandler.cpp]
// C++ code
```

:::
````

Use realistic filename labels with extensions so `vitepress-plugin-group-icons` can add the correct icons:

````md
```ts [stringUnion.ts]
```

```ts [dateTime.ts]
```
````

Do not use abstract labels such as `[Example 1]` when a filename is appropriate.

## Type Signatures

Type signatures must match the source.

Use method syntax for object members:

```ts
type UsePagination = {
    readonly page: Ref<number>;

    setPage(page: number): void;
};
```

Do not collapse structured declarations into unreadable single lines.

Only wrap a function declaration when its line would require horizontal scrolling:

```ts
declare function useDataTable<T>(
    items: Ref<T[]>,
    pageSize?: number
): UseDataTable<T>;
```

Keep short declarations on one line:

```ts
declare function useOpen(): UseOpen;
```

This wrapping rule applies to type-signature blocks, not usage examples.

Do not add or remove `?` based on whether an implementation has a default. The signature must follow the documented source declaration.

## Related Exports

When an export uses other public exports internally, add:

```md
## Uses

- [setDarkTheme](./setDarkTheme)
- [setWebsiteLocale](./setWebsiteLocale)
```

The heading is `Uses`, not `Used by`.

Do not add unrelated links. For example, same-named prototype methods on different primitive types should not reference each other unless one actually uses the other.

## Menus And Navigation

When adding or moving pages:

1. Update the appropriate file in `docs/.vitepress/config/menu/`.
2. Keep every package in its own sidebar section.
3. Keep meaningful category groups.
4. Category and package groups should follow the existing collapsible behavior.
5. Do not point the top-level Packages navigation item directly to one package.
6. Ensure links match the actual Markdown paths.

Do not restructure VitePress configuration or theme components unless explicitly requested.

In particular, do not modify:

```text
docs/.vitepress/theme/components/FrontmatterDocs.vue
docs/.vitepress/theme/components/Parameters.vue
docs/.vitepress/theme/components/Returns.vue
```

when a documentation-frontmatter change is sufficient.

## Guide Pages

Guide content belongs under:

```text
docs/guide/
```

Use multiple focused guide pages when a subject needs substantial explanation. Do not put every concept into one oversized guide page.

Guide pages may use a more tutorial-oriented structure than API reference pages, but examples must follow the same import, semicolon, Vue, and code-group rules.

## Validation

Before finishing:

1. Confirm every documented export is public.
2. Confirm every public export has its own page.
3. Confirm paths and menu links exist.
4. Confirm parameter types, `optional`, and `defaultValue` against source.
5. Confirm return methods use TypeScript method syntax.
6. Confirm examples import the documented API.
7. Confirm multiple-file examples use code groups.
8. Confirm type signatures match source and avoid unnecessary horizontal scrolling.
9. Search for duplicated "Optional" and "Defaults to" wording.
10. Build the documentation:

```sh
bun run --cwd docs build
```

Do not report completion when the VitePress build fails.
