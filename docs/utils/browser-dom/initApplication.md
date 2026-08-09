---
outline: deep

params:
    - name: config
      description: Application startup settings.
      type: ApplicationConfig
---

# initApplication

Applies common document-level startup settings in one call. It sets the website locale, toggles dark theme state, and optionally disables zoom. Use it from browser startup code after the document is available.

## Importing

```ts
import { initApplication } from '@almighty-shogun/utils';
```

## Usage

```ts
import { initApplication } from '@almighty-shogun/utils';

initApplication({
    locale: 'nl',
    isDarkTheme: true,
    isZoomDisabled: true
});
```

<FrontmatterDocs/>

## Uses

- [Undefinable](../types#undefinable)
- [disableZoom](./disableZoom)
- [setDarkTheme](./setDarkTheme)
- [setWebsiteLocale](./setWebsiteLocale)

## Type signature

```ts
declare function initApplication(config: ApplicationConfig): void;

type ApplicationConfig = {
    locale?: Undefinable<string>;
    isDarkTheme?: Undefinable<boolean>;
    isZoomDisabled?: Undefinable<boolean>;
};
```
