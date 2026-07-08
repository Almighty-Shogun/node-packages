---
outline: deep

params:
    - name: key
      description: Local storage key used to read the initial value and persist later changes.
      type: string

    - name: defaultValue
      description: Initial value used when local storage has no value or when the stored value cannot be parsed.
      type: T | null

returns: A writable `Ref<T | null>` that stays synchronized with local storage.
---

# localStorageRef

Creates a Vue ref backed by `localStorage`. The helper reads the current stored value on creation, falls back to `defaultValue` when nothing is stored, and writes every later ref change back to the same storage key.

Values are serialized with `JSON.stringify()` by default. When the default value is a Luxon `DateTime`, the value is stored as an ISO string and restored with `DateTime.fromISO()`. Setting the ref to `null` or `undefined` removes the local storage entry, which makes clearing persisted state explicit.

## Importing

```ts
import { localStorageRef } from '@almighty-shogun/common'
```

## Usage

::: code-group

```ts [stringUnion.ts]
import { localStorageRef } from '@almighty-shogun/common'

type WebsiteTheme = 'light' | 'dark';

const selectedTheme = localStorageRef<WebsiteTheme>('theme', 'light');

selectedTheme.value = 'dark';
```

```ts [dateTime.ts]
import { DateTime } from 'luxon'
import { localStorageRef } from '@almighty-shogun/common'

const lastVisit = localStorageRef('last-visit', DateTime.now());

lastVisit.value = DateTime.now();
```

:::

<FrontmatterDocs/>

## Type signature

```ts
declare function localStorageRef<T>(
    key: string,
    defaultValue: T | null
): Ref<T | null>;
```
