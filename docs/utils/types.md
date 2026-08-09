---
outline: deep
---

# Types

Shared TypeScript types exported by `@almighty-shogun/utils`.

## Arrayable

Represents a single value or an array of values.

```ts
type Arrayable<T> = T | T[];
```

## Nullable

Represents a value that may be `null`.

```ts
type Nullable<T> = T | null;
```

## Undefinable

Represents a value that may be `undefined`.

```ts
type Undefinable<T> = T | undefined;
```

## NullableOrUndefinable

Represents a value that may be either `null` or `undefined`.

```ts
type NullableOrUndefinable<T> = Nullable<T> | Undefinable<T>;
```

## Promisable

Represents a value that may be delivered synchronously or as a promise. Use it for callbacks and handlers that are allowed to be `async` without forcing every caller to be.

```ts
type Promisable<T> = T | Promise<T>;
```

## PromiseGetter

Represents a function that returns a promise.

```ts
type PromiseGetter<T> = (() => Promise<T>);
```

## PromiseOrGetter

Represents either a promise or a function that creates one.

```ts
type PromiseOrGetter<T> = Promise<T> | PromiseGetter<T>;
```

## HTMLTarget

Browser target accepted by DOM helpers that work with elements, the current window, or the current document.

```ts
type HTMLTarget = HTMLElement | Window | Document;
```
