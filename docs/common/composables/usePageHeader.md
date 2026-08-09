---
outline: deep

params:
    - name: config
      description: Header state to apply to the shared refs. When omitted, the current shared refs are returned without mutation.
      type: Undefinable<HeaderData<TIcon>>
      optional: true

returns:
    - name: pageTitle
      description: Shared page-header title ref. It starts as `Dashboard` and is replaced by `config.title` when config is provided.
      type: Ref<string>

    - name: pageIcon
      description: Shared page-header icon ref. It starts as `grid-2` and is replaced by `config.icon` when config is provided.
      type: Ref<TIcon>
---

# usePageHeader

Returns module-level refs for the current page-header title and icon. The refs are shared across every caller, so updating them in one view updates the state read by layout components that call `usePageHeader()` without config.

When `config` is provided, `title` and `icon` are required and immediately replace the shared refs. `page` is optional; when it has a value, the function assigns it to `document.title`. When `page` is omitted or `undefined`, the current document title is preserved.

## Importing

```ts
import { usePageHeader } from '@almighty-shogun/common';
```

## Usage

::: code-group

```vue [UsersView.vue]
<template>
    <section>
        <h1>Users</h1>
    </section>
</template>

<script setup lang="ts">
import { usePageHeader } from '@almighty-shogun/common';

usePageHeader({
    title: 'Users',
    icon: 'users',
    page: 'Users'
});
</script>
```

```vue [PageHeader.vue]
<template>
    <header>
        <Icon :name="pageIcon" />
        <h2>{{ pageTitle }}</h2>
    </header>
</template>

<script setup lang="ts">
import { usePageHeader } from '@almighty-shogun/common';

const { pageTitle, pageIcon } = usePageHeader();
</script>
```

:::

## Icon typing

The icon type is left to the caller through the `TIcon` parameter, so the package does not depend on any icon set. It defaults to `string`, which is enough when icon names are plain strings.

Pass the union from your icon library to get autocompletion and checking on `config.icon` and `pageIcon`:

```ts
import { usePageHeader } from '@almighty-shogun/common';

type IconName = 'grid-2' | 'settings' | 'users';

const { pageIcon } = usePageHeader<IconName>({
    title: 'Users',
    icon: 'users'
});
```

Any union works, including one exported by an icon library, so `usePageHeader<FluxIconName>(...)` types `icon` and `pageIcon` against that library's names without this package depending on it.

::: warning
Because the underlying refs are shared, `TIcon` describes how one call reads the icon rather than restricting what other callers may write. Use the same type argument across an application so every view agrees on the icon set.
:::

<FrontmatterDocs/>

## Uses

- [Undefinable](../../utils/types#undefinable)

## Type signature

```ts
declare function usePageHeader<TIcon = string>(
    config?: Undefinable<HeaderData<TIcon>>
): UsePageHeader<TIcon>;

type HeaderData<TIcon = string> = {
    title: string;
    icon: TIcon;
    page?: Undefinable<string>;
};

type UsePageHeader<TIcon = string> = {
    readonly pageTitle: Ref<string>;
    readonly pageIcon: Ref<TIcon>;
};
```
