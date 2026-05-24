# reload

Reloads the current browser page. This is a tiny wrapper for places where application code should express the intent to reload without reaching directly into `window.location`.

## Importing

```ts
import { reload } from '@almighty-shogun/utils'
```

## Usage

```ts
import { reload } from '@almighty-shogun/utils'

reload();
```

## Type signature

```ts
declare function reload(): void;
```
