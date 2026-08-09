---
outline: deep

params:
    - name: value
      description: Text to write to the clipboard.
      type: string

returns: '`true` when the text was copied, otherwise `false`.'
---

# copyToClipboard

Writes text to the browser clipboard with `navigator.clipboard.writeText()`. Clipboard errors are caught and converted to `false`, making the helper useful in UI actions where callers want a boolean success result instead of exception handling.

## Importing

```ts
import { copyToClipboard } from '@almighty-shogun/utils';
```

## Usage

```ts
import { copyToClipboard } from '@almighty-shogun/utils';

const copied = await copyToClipboard('https://example.com/invite');
```

<FrontmatterDocs/>

## Type signature

```ts
declare function copyToClipboard(value: string): Promise<boolean>;
```
