# Introduction

Welcome to Node Packages, a focused collection of TypeScript packages used across Vue, browser, Bun, and WebKit-native projects. Each package is published independently and documented with the same structure: installation, usage examples, parameters, returns, type signatures, and internal public dependencies where relevant.

The repository is intentionally practical. Packages are small, ESM-first, TypeScript-first, and focused on reusable pieces that are common enough to share but not large enough to become a framework.

## What packages are there?

- [Prototype Extensions](/prototype-extensions/) &mdash; side-effect prototype extensions for `Array`, `String`, and `Number` helpers.
- [Utils](/utils/) &mdash; shared TypeScript utilities for values, formatting, locale metadata, Luxon date helpers, serialization, and browser APIs.
- [Common](/common/) &mdash; Vue-focused application helpers for state, local storage, forms, pagination, routing, DOM targets, keyboard shortcuts, and i18n.
- [WebKit Native Bridge](/webkit-native-bridge/) &mdash; typed request and command bridge for JavaScript running inside WebKit host applications.
- [Bun Server](/bun-server/) &mdash; typed routing, server setup, and response helpers for Bun HTTP servers.

See the [packages overview](/packages) for how they depend on each other, what each one requires, and which to install first.
