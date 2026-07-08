# Introduction

Welcome to Node Packages, a small collection of TypeScript packages used across Vue, browser, and WebKit-native projects. Each package is published independently and documented with the same structure: installation, usage examples, parameters, returns, type signatures, and internal public dependencies where relevant.

The repository is intentionally practical. Packages are small, ESM-first, TypeScript-first, and focused on reusable pieces that are common enough to share but not large enough to become a framework.

## What packages are there?

- [Prototype Extensions](/prototype-extensions/) &mdash; side-effect imports that add focused helpers to `Array`, `String`, and `Number`.
- [Utils](/utils/) &mdash; shared date, number, locale, DOM, theme, and browser utilities.
- [Common](/common/) &mdash; Vue composables, route helpers, required refs, and i18n helpers.
- [WebKit Native Bridge](/webkit-native-bridge/) &mdash; a typed JavaScript-to-C++ bridge for WebKit-hosted applications.
