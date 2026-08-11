# Repository Instructions

Use this file as the root guidance for the `@almighty-shogun/node-packages` monorepo.

`CLAUDE.md` and `AGENTS.md` are the same document, differing only where they name themselves. Any change to one must be made to the other in the same commit, or they drift apart. The same rule applies to `docs/CLAUDE.md` and `docs/AGENTS.md`.

## Project

This repository contains shared Node/Bun packages maintained in one Bun workspace.

Workspace packages live in `packages/*`:

- `@almighty-shogun/prototype-extensions` &mdash; prototype methods for built-in JavaScript types. No dependencies.
- `@almighty-shogun/utils` &mdash; framework-agnostic utility functions. Depends on `luxon` and `@types/luxon`.
- `@almighty-shogun/http-core` &mdash; runtime-agnostic HTTP vocabulary, the shared `HttpBaseResponse` class, query-string helpers, and the error classes both server packages throw. Depends on `utils` for types only and on `luxon` at runtime, used solely by `queryDate`.
- `@almighty-shogun/common` &mdash; Vue application helpers. Depends on `utils` at runtime; `vue` and `vue-router` are peer dependencies.
- `@almighty-shogun/webkit-native-bridge` &mdash; typed JavaScript/native WebKit bridge helpers. Depends on `utils` for types only.
- `@almighty-shogun/bun-server` &mdash; Bun HTTP server routing and response helpers. Depends on `http-core` at runtime and `utils` for types only; `@types/bun` is an optional peer dependency.
- `@almighty-shogun/cloudflare-worker` &mdash; Cloudflare Worker routing, scheduling, and response helpers. Depends on `http-core` at runtime and `utils` for types only; `@cloudflare/workers-types` is an optional peer dependency.

Both server packages re-export every `http-core` export from their own root with a single `export * from '@almighty-shogun/http-core';`, so applications install one package and never name `http-core`. Do not replace that with an enumerated list; it would need hand-maintaining in step with every `http-core` addition.

Documentation lives in `docs/` and has its own detailed instructions in `docs/CLAUDE.md`.

## Package Conventions

- Follow `.editorconfig` for formatting and code style, not only basic whitespace. This includes indentation, line endings, final newlines, TypeScript import formatting, quote style, semicolon usage, brace placement, object/union wrapping, and spacing rules.
- Packages are ESM unless an existing package intentionally differs.
- Keep public exports behind package entry points and local barrel files.
- Keep exported types organized by category when a package has enough types to justify it.
- Internal helpers belong in package-local `src/internal/` when they are shared across files and not public API.
- Small private helpers may stay next to the code that uses them when extracting them would add noise.
- Do not document or export internal helpers unless the user explicitly asks to make them public.
- Preserve package naming, author, license, repository, `files`, `exports`, `main`, `types`, and `publishConfig` patterns from existing packages.
- Do not add comments unless asked. Explain reasoning in the reply instead, and leave existing comments alone.

### Shared Types

`@almighty-shogun/utils` owns the vocabulary the other packages reuse. Prefer these over writing the union inline:

- `Nullable<T>`, `Undefinable<T>`, `NullableOrUndefinable<T>`
- `Arrayable<T>` for `T | T[]`, mutable by design
- `Promisable<T>` for `T | Promise<T>`
- `PromiseGetter<T>`, `PromiseOrGetter<T>`
- `HTMLTarget` for `HTMLElement | Window | Document`

Wrap a parameter or property in `Undefinable<T>` when its declaration uses `?`. A parameter with a default value keeps its plain type, because the default already removes `undefined` from the call site.

Apply `readonly` only where it is load-bearing: composable return types, and object shapes that are genuinely frozen at runtime. Do not apply it to general-purpose aliases or to inputs that are only read.

When the same union appears in more than one signature, name it once and import it. When a type alias would shadow a DOM global, such as `Element`, pick a distinct name.

## Build And Verification

Use Bun from the repository root.

Type checking:

```bash
bun run typecheck
```

`tsdown` emits declarations without type checking them, so a successful `build` does not mean the package compiles. Run `typecheck` after changing types or signatures, and treat it as the authoritative check.

Package builds:

```bash
bun --cwd packages/prototype-extensions build
bun --cwd packages/utils build
bun --cwd packages/http-core build
bun --cwd packages/common build
bun --cwd packages/webkit-native-bridge build
bun --cwd packages/bun-server build
bun --cwd packages/cloudflare-worker build
```

Documentation build:

```bash
bun run docs:build
```

The documentation build has dead-link checking enabled, so it fails on a broken internal link.

Run only the checks relevant to the change when the scope is small. For release preparation or shared build/config changes, run the full type check, package build, and docs build surface.

## Verifying Behavior

Do not describe runtime behavior from reading alone when it can be executed. Write a scratch file outside the repository, run it with Bun, and delete it afterwards. This applies to fallback behavior, error paths, type-guard results, and anything that depends on a browser or storage API.

Be careful how results are printed. `JSON.stringify(NaN)` produces `"null"`, which can turn a correct implementation into a false bug report.

## Documentation

When creating or updating documentation, read `docs/CLAUDE.md` first and follow it exactly.

Important defaults:

- Document only public exports.
- Give every public export its own page.
- Keep docs under `docs/<package>/`, not `docs/packages/<package>/`.
- Use the established VitePress frontmatter schema and `<FrontmatterDocs/>`.
- Keep examples copy-paste-ready and free of horizontal scrolling.
- For Vue examples, put `<template>` before `<script>`.

Documentation changes that follow a source change are part of that change, not a follow-up. A renamed export, a widened parameter, or a new fallback is not finished until its page, the sidebar, and any cross-references match.

## Releasing

User-level release skills should use these repository overrides.

- Publishing is CI-driven by `.github/workflows/release.yml`.
- Package versions are intentionally `0.0.0` in the repository and are changed by CI.
- Do not run `bun publish`, `npm publish`, manually push tags, create version commits, or change package versions locally.
- Stable releases only unless the workflows are updated first.
- Release checks should use the release preparation build surface from the existing `Build And Verification` section.
