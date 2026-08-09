---
outline: deep

params:
    - name: hotKeys
      description: Hotkey string or list of strings such as `mod+k`, `escape`, or `shift+?`.
      type: Arrayable<string>

    - name: handler
      description: Keyboard event handler called when a configured hotkey matches.
      type: HotKeyHandler

    - name: options
      description: Registration and event-handling options.
      type: UseHotKeyOptions
      optional: true
      defaultValue: '{}'

returns: A dispose function that removes the keyboard listener.
---

# useHotKey

Registers keyboard shortcuts on `window` or a custom target.

Only the first matching hotkey runs, and the handler receives the original `KeyboardEvent`.

## Importing

```ts
import { useHotKey } from '@almighty-shogun/common';
```

## Usage

```ts
import { useHotKey } from '@almighty-shogun/common';

const dispose = useHotKey('mod+k', () => {
    // Open command palette.
});

dispose();
```

## Modifiers and keys

Hotkey strings are split on `+` and are case-insensitive. Aliases cover the awkward key names: `ctrl`, `cmd`, `command`, `super`, `win`, `windows`, `option`, `opt`, `esc`, `return`, `del`, `up`, `down`, `left`, `right`, `space`, `spacebar`, and `plus`.

`mod` is a portable modifier rather than an alias for one key: it matches Meta on Apple platforms and Control everywhere else, so `mod+k` is the usual way to write a command-palette shortcut.

## Options

Every field of `UseHotKeyOptions` is optional, and the defaults live in the implementation rather than the type:

- `target` &mdash; element, window, document, or component instance to listen on. Defaults to `window`.
- `enabled` &mdash; when supplied and falsy, matching is skipped. Unset means always enabled.
- `event` &mdash; `'keydown'` or `'keyup'`. Defaults to `'keydown'`.
- `preventDefault` &mdash; calls `preventDefault()` on a match. Defaults to `true`.
- `stopPropagation` &mdash; calls `stopPropagation()` on a match. Defaults to `false`.
- `ignoreWhileTyping` &mdash; skips shortcuts that use neither Control nor Meta while focus sits in an input, textarea, select, or content-editable element. Defaults to `true`.
- `repeat` &mdash; allows auto-repeat keydown events to match. Defaults to `false`.

<FrontmatterDocs/>

## Uses

- [Arrayable](../../utils/types#arrayable)
- [HTMLTarget](../../utils/types#htmltarget)
- [NullableOrUndefinable](../../utils/types#nullableorundefinable)
- [Undefinable](../../utils/types#undefinable)
- [useEventListener](./useEventListener)

## Type signature

```ts
declare function useHotKey(
    hotKeys: Arrayable<string>,
    handler: HotKeyHandler,
    options?: UseHotKeyOptions
): () => void;

type HotKeyHandler = (event: KeyboardEvent) => void;
type ComponentTarget = HTMLTarget | ComponentPublicInstance;
type UseHotKeyOptions = {
    target?: MaybeRefOrGetter<NullableOrUndefinable<ComponentTarget>>;
    enabled?: MaybeRefOrGetter<Undefinable<boolean>>;
    event?: Undefinable<'keydown' | 'keyup'>;
    preventDefault?: Undefinable<boolean>;
    stopPropagation?: Undefinable<boolean>;
    ignoreWhileTyping?: Undefinable<boolean>;
    repeat?: Undefinable<boolean>;
};
```
