---
outline: deep

returns: A computed, deeply readonly `RouteMeta` holding the merged meta of every matched route record.
---

# useRouteMeta

Collects the `meta` of every route record matched by the current route into one object, merging nested values rather than replacing them.

Vue Router already exposes `route.meta`, but it merges the matched records shallowly. A nested object declared on a parent is replaced outright as soon as a child declares the same key, so the parent's other entries under that key are lost. This merges key by key at any depth, so a parent and a child can each own part of the same nested value.

The result is computed, so it follows navigation without needing a watcher. It is a new object rather than a view onto the route records, and it is deeply readonly, so route configuration cannot be edited through it by accident.

## Importing

```ts
import { useRouteMeta } from '@almighty-shogun/common';
```

## Usage

```vue
<template>
    <header>
        <Icon v-if="meta.icon" :name="meta.icon"/>
        <h1>{{ meta.title }}</h1>
    </header>
</template>

<script setup lang="ts">
import { useRouteMeta } from '@almighty-shogun/common';

const meta = useRouteMeta();
</script>
```

A layout placed on a parent route can read a value the parent declared while the page below it overrides only what it cares about, without either needing to know how deeply it sits in the hierarchy.

## Merge order

Records are walked outermost first, so a deeper record is applied later and wins any key both declare. Keys declared by only one record are all kept, whichever level they came from.

::: code-group

```ts [router/flat.ts]
const routes = [
    {
        path: '/admin',
        meta: { title: 'Admin', icon: 'user-gear', section: 'management' }
    },
    {
        path: '/admin/users',
        meta: { title: 'Users', icon: 'users' }
    },
    {
        path: '/admin/users/:id/edit',
        meta: { title: 'Edit user', icon: 'user-pen', requiresAuth: true }
    }
];
```

```ts [router/nested.ts]
const routes = [
    {
        path: '/admin',
        meta: { title: 'Admin', icon: 'user-gear', section: 'management' },
        children: [
            {
                path: 'users',
                meta: { title: 'Users', icon: 'users' },
                children: [
                    {
                        path: ':id/edit',
                        meta: {
                            title: 'Edit user',
                            icon: 'user-pen',
                            requiresAuth: true
                        }
                    }
                ]
            }
        ]
    }
];
```

:::

Either shape matches the same three records, so visiting `/admin/users/:id/edit` gives:

```ts
{
    title: 'Edit user',
    icon: 'user-pen',
    section: 'management',
    requiresAuth: true
}
```

`title` and `icon` were declared three times and resolve to the deepest. `section` was declared only at the top and `requiresAuth` only at the bottom, so both survive untouched.

::: tip
The rule holds at every level rather than only the top one. A deeper record wins the exact keys it declares and everything else is kept, however far inside the object it sits.
:::

Anything that is not a plain object is replaced rather than combined. An array declared deeper replaces an outer one entirely instead of merging entry by entry, and a value of `undefined` is skipped so a deeper record cannot blank out a key an outer record set.

## Typing the result

The return type is Vue Router's `RouteMeta`, which is empty until you declare your own keys on it. Augment it once and every call is typed, including the nested values. Vue's `DeepReadonly` is applied on top, so a nested object comes back with readonly properties and an array comes back as a `readonly` array, and assigning to either is a compile error.

```ts
declare module 'vue-router' {
    interface RouteMeta {
        title?: string;
        icon?: string;
        requiresAuth?: boolean;
    }
}
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useRouteMeta(): ComputedRef<DeepReadonly<RouteMeta>>;
```
