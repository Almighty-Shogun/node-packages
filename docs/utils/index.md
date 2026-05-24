# Utils

Shared TypeScript utilities for browser applications. The package focuses on formatting, locale metadata, Luxon date helpers, and small DOM/browser actions that are reused across projects.

The package is tree-shakeable and exposes named exports from the root entry point, so application code can import only the utilities it uses.

## Categories

- [Locale](./locale/getLanguage) &mdash; language metadata for supported locales.
- [Date and time](./date-time/formatDate) &mdash; Luxon-based date, time, duration, and comparison helpers.
- [Numbers](./numbers/formatCurrency) &mdash; number, currency, percentage, and Celsius formatting.
- [Browser and DOM](./browser-dom/initApplication) &mdash; document setup, scrolling, reload, theme, locale, and zoom helpers.

## Dependencies

- `luxon` - used by date, time, duration, and touch timing helpers.
- Browser APIs - required by DOM-specific helpers such as `setDarkTheme`, `reload`, and `disableZoom`.

## Quick example

```ts
import { DateTime } from 'luxon'
import { formatDate, formatCurrency, setWebsiteLocale } from '@almighty-shogun/utils'

setWebsiteLocale('nl');

const date = formatDate(DateTime.now(), 'nl');
const total = formatCurrency(1299.5, 'EUR', 'nl');
```

Continue with [installation](./installation) or jump to a category from the sidebar.
