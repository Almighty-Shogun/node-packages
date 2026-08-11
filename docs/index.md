---
layout: home

title: Node Packages
titleTemplate: Documentation

hero:
    name: Node Packages
    text: Small TypeScript packages for web applications.
    tagline: API-focused documentation for utilities, Vue composables, prototype helpers, HTTP servers on Bun and Cloudflare, and a WebKit native bridge.

    image:
        src: /logo.svg
        alt: 'Shogun App Icon'

    actions:
        -   theme: brand
            text: Get started
            link: /guide/
        -   theme: alt
            text: View packages
            link: /packages

features:
    -   title: Prototype Extensions
        details: Side-effect prototype extensions for Array, String, and Number helpers.
        link: /prototype-extensions/
        linkText: View package

    -   title: Utils
        details: Shared TypeScript utilities for values, formatting, locale metadata, Luxon date helpers, serialization, and browser APIs.
        link: /utils/
        linkText: View package

    -   title: HTTP Core
        details: Runtime-agnostic HTTP vocabulary, response class, query-string helpers, and error classes shared by the server packages.
        link: /http-core/
        linkText: View package

    -   title: Common
        details: Vue-focused application helpers for state, local storage, forms, pagination, routing, DOM targets, keyboard shortcuts, and i18n.
        link: /common/
        linkText: View package

    -   title: WebKit Native Bridge
        details: Typed request and command bridge for JavaScript running inside WebKit host applications.
        link: /webkit-native-bridge/
        linkText: View package

    -   title: Bun Server
        details: Typed routing, server setup, and response helpers for Bun HTTP servers.
        link: /bun-server/
        linkText: View package

    -   title: Cloudflare Worker
        details: Typed routing, scheduled handlers, worker setup, and response helpers for the Cloudflare Workers runtime.
        link: /cloudflare-worker/
        linkText: View package
---
