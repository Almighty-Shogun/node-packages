# Utils

Shared TypeScript utilities for browser applications. The package focuses on value guards, formatting, locale metadata, Luxon date helpers, serialization, and small DOM/browser actions that are reused across projects.

The package is tree-shakeable and exposes named exports from the root entry point, so application code can import only the utilities it uses.

## Categories

- [Values](./values/hasValue) &mdash; nullability, empty-value, type guard, string, and optional mapping helpers.
- [Locale](./locale/getLanguage) &mdash; language metadata for supported locales.
- [Date and time](./date-time/formatDate) &mdash; Luxon-based date, time, duration, and comparison helpers.
- [Numbers](./numbers/formatCurrency) &mdash; number, currency, percentage, Celsius, and Fahrenheit formatting.
- [Browser and DOM](./browser-dom/copyToClipboard) &mdash; clipboard, document setup, scrolling, reload, theme, locale, and zoom helpers.
- [Control flow](./control-flow/delay) &mdash; promise-based waiting and small function wrappers for before/after hooks.
- [Serialization](./serialization/serialize) &mdash; string conversion helpers for primitives and selected built-in object types.
- [Types](./types) &mdash; shared nullability, array, promise, and DOM target type aliases.
- [Constants](./constants) &mdash; typography and temperature-unit display constants.

## Dependencies

- `luxon` and `@types/luxon` &mdash; direct dependencies, used by the date, time, duration, and touch timing helpers. Luxon ships no types of its own, so both are needed.
- Browser APIs &mdash; required by DOM-specific helpers such as [`setDarkTheme`](./browser-dom/setDarkTheme), [`reload`](./browser-dom/reload), and [`disableZoom`](./browser-dom/disableZoom).

## Quick example

```ts
import { DateTime } from 'luxon';
import { formatDate, setWebsiteLocale } from '@almighty-shogun/utils';

setWebsiteLocale('nl');

const date = formatDate(DateTime.now(), 'nl');
```

Continue with [installation](./installation) or jump to a category from the sidebar.
