# clearRegisteredI18n

Clears the registered i18n instance. Use it in tests, app teardown, or any environment where the global translation instance should be reset.

## Importing

```ts
import { clearRegisteredI18n } from '@almighty-shogun/common'
```

## Usage

```ts
import { clearRegisteredI18n } from '@almighty-shogun/common'

clearRegisteredI18n();
```

## Type signature

```ts
declare function clearRegisteredI18n(): void;
```
