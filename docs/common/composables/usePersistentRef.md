---
outline: deep

params:
    - name: key
      description: Local-storage key to read and write.
      type: string

    - name: defaultValue
      description: Initial value and deserialization template. Passing `null` creates a nullable string ref that restores stored values without parsing them.
      type: null | T

returns: A Vue ref that writes present values to local storage and removes the storage entry for empty values.
---

# usePersistentRef

Creates a Vue ref backed by `localStorage`. In browser environments, it reads the storage key during setup, watches the ref deeply, serializes present values into storage, and removes the storage entry when the ref becomes empty.

A stored value is restored whenever one is present. `defaultValue` doubles as the type template for [`deserialize`](../../utils/serialization/deserialize), so passing `null` means there is no type to parse against and the stored value is returned as the plain string it was written as, which is what the `null` overload's `Ref<Nullable<string>>` describes.

In non-browser environments, the helper returns `ref(defaultValue)` and does not read, write, or watch `localStorage`.

This is a lower-level persistence helper than [`useLocalStorage`](./useLocalStorage): it does not include a prefix option and it accesses `localStorage` directly.

## Importing

```ts
import { usePersistentRef } from '@almighty-shogun/common';
```

## Usage

```ts
import { usePersistentRef } from '@almighty-shogun/common';

const selectedProjectId = usePersistentRef('selected-project-id', null);
const filters = usePersistentRef('filters', { status: 'active' });

selectedProjectId.value = 'project_123';
filters.value = { status: 'archived' };
```

## Failure handling

Storage access is best-effort in both directions, so the ref stays usable when `localStorage` is full, blocked, or unavailable:

- A read that throws falls back to `defaultValue`. Nothing is removed, because a failing read means storage itself is unavailable and the removal would throw as well.
- A stored value that cannot be parsed as the type of `defaultValue` is ignored and the ref keeps `defaultValue`, because [`deserialize`](../../utils/serialization/deserialize) falls back rather than throwing. The ref is therefore only `null` when nothing is stored, when the parse fell back to a `null` default, or when you assign `null` yourself.
- A write that throws, such as on `QuotaExceededError`, is caught. The ref keeps the new value in memory; only persistence is skipped.

Both failures log a `console.warn` naming the storage key and including the original error, so a quota or permission problem is visible during development instead of failing silently.

<FrontmatterDocs/>

## Uses

- [Nullable](../../utils/types#nullable)
- [deserialize](../../utils/serialization/deserialize)
- [hasValue](../../utils/values/hasValue)
- [serialize](../../utils/serialization/serialize)

## Type signature

```ts
declare function usePersistentRef(
    key: string,
    defaultValue: null
): Ref<Nullable<string>>;

declare function usePersistentRef<T extends {}>(
    key: string,
    defaultValue: T
): Ref<Nullable<T>>;
```
