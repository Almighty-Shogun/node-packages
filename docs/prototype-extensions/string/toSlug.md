---
outline: deep

returns: A slug string.
---

# toSlug

Converts a string into a URL-friendly slug. The method trims surrounding whitespace, lowercases the value, removes unsupported characters, collapses whitespace and separators into `-`, and removes leading or trailing dashes.

## Usage

```ts
const slug = '  Hello World!  '.toSlug()

// 'hello-world'
```

<FrontmatterDocs/>

## Type signature

```ts
interface String {
    toSlug(): string;
}
```
