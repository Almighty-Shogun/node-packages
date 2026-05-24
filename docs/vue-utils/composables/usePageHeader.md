---
outline: deep

params:
    - name: config
      description: Optional header data.
      type: HeaderData

returns:
    - name: pageTitle
      description: Shared title value for the current page header.
      type: Ref<string>

    - name: pageIcon
      description: Shared icon name for the current page header.
      type: Ref<FluxIconName>
---

# usePageHeader

Stores shared page header state for title and icon. Passing a config updates the shared refs and can update `document.title`, making it useful for route-level page setup.

## Importing

```ts
import { usePageHeader } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { usePageHeader } from '@almighty-shogun/vue-utils'

const header = usePageHeader({
    title: 'Users',
    icon: 'users',
    page: 'Users - Dashboard'
});
```

<FrontmatterDocs/>

## Type signature

```ts
declare function usePageHeader(config?: HeaderData): UsePageHeader;

type HeaderData = {
    title: string;
    icon: FluxIconName;
    page?: string;
};

type UsePageHeader = {
    readonly pageTitle: Ref<string>;
    readonly pageIcon: Ref<FluxIconName>;
};
```
