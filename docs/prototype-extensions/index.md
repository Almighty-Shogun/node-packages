# Prototype Extensions

Small side-effect helpers for built-in JavaScript prototypes. The package augments `Array`, `String`, and `Number` with convenience methods that are intentionally narrow: they cover common collection, string, and arithmetic operations without introducing a separate utility namespace.

Because this package patches prototypes at runtime, import it once near application startup or in a shared entry file before calling any of the methods.

## Categories

- [Array](./array/first) &mdash; collection helpers for reading, removing, toggling, and checking values.
- [String](./string/toSlug) &mdash; formatting and comparison helpers for string values.
- [Number](./number/add) &mdash; small arithmetic and comparison helpers for number values.

## Runtime behavior

The package is marked as side-effectful. It does not provide named runtime exports; importing the package installs the methods and makes the TypeScript augmentations available.

## Quick example

```ts
import '@almighty-shogun/prototype-extensions'

const selected = ['users', 'settings'].addOrRemove('users');
const slug = 'User Settings'.toSlug();
const validPage = (25).isInRange(5, 100);
```

Continue with [installation](./installation) or jump to a category from the sidebar.
