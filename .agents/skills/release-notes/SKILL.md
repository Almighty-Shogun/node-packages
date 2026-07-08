---
name: release-notes
description: Generate GitHub release notes or a changelog for the @almighty-shogun/node-packages monorepo by diffing a base ref against origin/main. Use when the user asks for release notes, a changelog, or a summary of changes for an upcoming or specific release. This skill is read-only and never creates tags, releases, commits, or publishes packages.
---

# Release Notes

Generate release notes for `Almighty-Shogun/node-packages`.

This workflow is read-only. Do not create tags, releases, commits, or publish packages.

## Resolve Range

Refresh tags when needed:

```bash
git fetch origin --tags --prune
```

Use:

- Head: `origin/main`.
- Default base: latest published GitHub release tag.
- Explicit base: the tag or ref provided by the user.

Useful commands:

```bash
gh release view --json tagName -q .tagName
git rev-parse "<base>"
git rev-parse origin/main
gh repo view --json nameWithOwner -q .nameWithOwner
```

If `<base>` and `origin/main` point to the same commit, report that there are no changes and stop.

## Gather Changes

Run:

```bash
git log --oneline --no-merges <base>..origin/main
git diff --name-status <base>..origin/main -- 'packages/**' 'docs/**' '.github/**'
git diff --stat <base>..origin/main
```

Read relevant diffs before describing behavior. Do not rely only on commit subjects when a change affects public API, package exports, workflows, or documentation structure.

## Classify

Group changes by package or repo area first. Then classify the entries inside each group.

Package groups:

- `@almighty-shogun/prototype-extensions`: changes under `packages/prototype-extensions` and its matching docs.
- `@almighty-shogun/utils`: changes under `packages/utils` and its matching docs.
- `@almighty-shogun/common`: changes under `packages/common` and its matching docs.
- `@almighty-shogun/webkit-native-bridge`: changes under `packages/webkit-native-bridge` and its matching docs.
- `@almighty-shogun/bun-server`: changes under `packages/bun-server` and its matching docs.
- `Documentation`: docs-wide changes that are not specific to one package.
- `Build and release`: workflows, publishing, package metadata, dependency wiring, and CI/deployment changes.
- `Internal`: repo maintenance that is worth mentioning but not tied to a public package API.

Use these subsection labels inside each group when they have content:

- Breaking changes: removed exports, renamed exports, changed signatures, changed setup requirements, removed package behavior, or workflow changes that alter publishing/deployment.
- New exports: added public packages, functions, classes, composables, types, or prototype methods.
- Features: new behavior in existing exports.
- Fixes: corrected behavior, typings, routing, documentation, publishing, or build issues.
- Documentation: meaningful documentation structure or content updates.
- Internal: dependency bumps, lockfile updates, formatting, or internal-only cleanup. Omit these unless they materially affect users.

## Render

Output one copy-paste-ready markdown block in English. Use package-first grouping:

```markdown
## `@almighty-shogun/common`

### New exports

- Added `useRouteParam` for working with route parameters as refs.

### Fixes

- Fixed `useLoaded` return typing in the documentation.

## `@almighty-shogun/utils`

### Features

- Added support for custom scroll targets in `scrollToTop`.

## Documentation

### Features

- Reworked the VitePress API page schema to use structured frontmatter.

## Build and release

### Fixes

- Added `@almighty-shogun/bun-server` to the release workflow.

**Full Changelog:** https://github.com/Almighty-Shogun/node-packages/compare/<base>...origin/main
```

Rules:

- Only include package or repo-area groups that have content.
- Only include subsections with content.
- Put package-specific documentation changes under that package when possible.
- Put cross-package VitePress or guide changes under `Documentation`.
- Put workflow, CI, package publishing, and repository release changes under `Build and release`.
- Put pure cleanup under `Internal` only when it is worth mentioning to users.
- Do not use em dashes or en dashes.
- Use complete sentences.
- Build the compare link from the resolved repo slug and refs.
- After the markdown block, briefly state the resolved range and any important caveats.
