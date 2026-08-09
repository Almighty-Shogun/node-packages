---
outline: deep

params:
    - name: key
      description: Local-storage key to read and write.
      type: string

    - name: defaultValue
      description: Value used when storage is empty, unavailable, or cannot be deserialized.
      type: T

    - name: options
      description: Prefix and serialization overrides.
      type: UseLocalStorageOptions<T>
      optional: true
      defaultValue: '{}'

returns: A Vue ref synchronized with local storage.
---

# useLocalStorage

Creates a Vue ref backed by `localStorage`. It reads the stored value once during setup, deserializes it using the supplied default value as the type template, and writes future changes back with a deep watcher.

Values that do not pass [`hasValue`](../../utils/values/hasValue) remove the storage entry instead of writing it, so blank strings, empty arrays, `null`, and `undefined` clear the key.

In non-browser environments the composable returns a plain ref holding the default value and never touches `localStorage`.

## Importing

```ts
import { useLocalStorage } from '@almighty-shogun/common';
```

## Usage

```ts
import { useLocalStorage } from '@almighty-shogun/common';

const sidebarOpen = useLocalStorage('sidebar-open', true);

sidebarOpen.value = false;
```

## Failure handling

Storage access is best-effort in both directions, so the ref stays usable when `localStorage` is full, blocked, or unavailable:

- A read that throws falls back to `defaultValue`. Nothing is removed, because a failing read means storage itself is unavailable and the removal would throw as well.
- A stored value that cannot be parsed as the type of `defaultValue` is ignored and the default is used, because [`deserialize`](../../utils/serialization/deserialize) falls back rather than throwing.
- A write that throws, such as on `QuotaExceededError`, is caught. The ref keeps the new value in memory; only persistence is skipped.

Both failures log a `console.warn` naming the storage key and including the original error, so a quota or permission problem is visible during development instead of failing silently.

<FrontmatterDocs/>

## Uses

- [Undefinable](../../utils/types#undefinable)
- [deserialize](../../utils/serialization/deserialize)
- [hasValue](../../utils/values/hasValue)
- [serialize](../../utils/serialization/serialize)

## Type signature

```ts
declare function useLocalStorage<T extends {}>(
    key: string,
    defaultValue: T,
    options?: UseLocalStorageOptions<T>
): Ref<T>;

type UseLocalStorageOptions<T> = {
    prefix?: Undefinable<string>;
    deserializer?(value: string, defaultValue: T): T;
    serializer?(value: T): string;
};
```
