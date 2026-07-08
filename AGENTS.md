# Repository Instructions

Use this file as the root guidance for the `@almighty-shogun/node-packages` monorepo.

## Project

This repository contains shared Node/Bun packages maintained in one Bun workspace.

Workspace packages live in `packages/*`:

- `@almighty-shogun/prototype-extensions` &mdash; prototype methods for built-in JavaScript types.
- `@almighty-shogun/utils` &mdash; framework-agnostic utility functions.
- `@almighty-shogun/common` &mdash; common application helpers, including Vue, Vue Router, and Vue i18n integrations.
- `@almighty-shogun/webkit-native-bridge` &mdash; typed JavaScript/native WebKit bridge helpers.
- `@almighty-shogun/bun-server` &mdash; Bun HTTP server routing and response helpers.

Documentation lives in `docs/` and has its own detailed instructions in `docs/AGENTS.md`.

## Package Conventions

- Follow `.editorconfig` for formatting and code style, not only basic whitespace. This includes indentation, line endings, final newlines, TypeScript import formatting, quote style, semicolon usage, brace placement, object/union wrapping, and spacing rules.
- Packages are ESM unless an existing package intentionally differs.
- Keep public exports behind package entry points and local barrel files.
- Keep exported types organized by category when a package has enough types to justify it.
- Internal helpers belong in package-local `src/internal/` when they are shared across files and not public API.
- Small private helpers may stay next to the code that uses them when extracting them would add noise.
- Do not document or export internal helpers unless the user explicitly asks to make them public.
- Preserve package naming, author, license, repository, `files`, `exports`, `main`, `types`, and `publishConfig` patterns from existing packages.

## Build And Verification

Use Bun from the repository root.

Package builds:

```bash
bun --cwd packages/prototype-extensions build
bun --cwd packages/utils build
bun --cwd packages/common build
bun --cwd packages/webkit-native-bridge build
bun --cwd packages/bun-server build
```

Documentation build:

```bash
bun run docs:build
```

Run only the checks relevant to the change when the scope is small. For release preparation or shared build/config changes, run the full package and docs build surface.

## Documentation

When creating or updating documentation, read `docs/AGENTS.md` first and follow it exactly.

Important defaults:

- Document only public exports.
- Give every public export its own page.
- Keep docs under `docs/<package>/`, not `docs/packages/<package>/`.
- Use the established VitePress frontmatter schema and `<FrontmatterDocs/>`.
- Keep examples copy-paste-ready.
- For Vue examples, put `<template>` before `<script>`.

## Release Safety

Publishing is CI-driven through GitHub releases.

- `.github/workflows/release.yml` publishes packages to npm.
- `.github/workflows/release-docs.yml` builds and deploys documentation.
- Package versions are intentionally `0.0.0` in the repository and are changed by CI.

Do not run `bun publish`, `npm publish`, push release tags manually, create version commits, or change package versions locally for a release.

The current GitHub workflows support stable releases only. Do not create beta or pre-release releases unless the workflows are updated first.

Repo-scoped Codex skills for release workflows should live under `.agents/skills/`:

- `.agents/skills/release-notes/SKILL.md`
- `.agents/skills/release/SKILL.md`
