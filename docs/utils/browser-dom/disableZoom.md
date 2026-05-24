# disableZoom

Disables common mobile zoom gestures by preventing double-tap and gesture zoom and by updating the viewport meta tag. Call it from client-side startup code when an application shell should behave like a fixed-scale mobile app.

## Importing

```ts
import { disableZoom } from '@almighty-shogun/utils'
```

## Usage

```ts
import { disableZoom } from '@almighty-shogun/utils'

disableZoom();
```

## Type signature

```ts
declare function disableZoom(): void;
```
