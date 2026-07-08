---
name: release
description: Create a stable GitHub release for the @almighty-shogun/node-packages monorepo and let CI publish packages and docs. Use when the user asks to cut, create, publish, or prepare a release. Resolves major, minor, patch, or explicit semver versions, runs safeguards and build checks, generates release notes, requires explicit confirmation, then creates the GitHub release. Never manually publishes packages, pushes tags, creates version commits, or changes package versions locally.
---

# Release

Create a stable GitHub release for `Almighty-Shogun/node-packages`.

Publishing is CI-driven:

- `.github/workflows/release.yml` publishes packages to npm.
- `.github/workflows/release-docs.yml` builds and deploys documentation.

Do not run `bun publish`, `npm publish`, push release tags manually, create version commits, or change package versions locally for a release. Package versions are intentionally `0.0.0` in the repository and are changed by CI.

The current workflows support stable releases only. Do not create beta or pre-release releases unless the workflows are updated first.

## Resolve Version

Accept:

- `major`
- `minor`
- `patch`
- an explicit stable semver version, such as `1.21.0`

Refresh tags:

```bash
git fetch origin --tags --prune
```

For `major`, `minor`, or `patch`, compute from the highest stable semver tag:

```bash
git tag -l | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -1
```

Bump:

- `major`: `X+1.0.0`
- `minor`: `X.Y+1.0`
- `patch`: `X.Y.Z+1`

For an explicit version, validate:

```text
^[0-9]+\.[0-9]+\.[0-9]+$
```

Show the resolved version before continuing.

## Safeguards

Run:

```bash
git rev-parse -q --verify "refs/tags/<version>"
gh release view "<version>"
git status --porcelain
git rev-parse origin/main
gh repo view --json nameWithOwner -q .nameWithOwner
```

Rules:

- If the tag or GitHub release already exists, stop.
- If the working tree is dirty, warn that local changes are not included in a release cut from `origin/main`. Continue only if the user accepts that.
- Capture the `origin/main` SHA. The release must target that SHA.

## Build Check

Run the same package and docs build surface CI depends on:

```bash
bun --cwd packages/prototype-extensions build
bun --cwd packages/utils build
bun --cwd packages/common build
bun --cwd packages/webkit-native-bridge build
bun --cwd packages/bun-server build
bun run docs:build
```

If any build fails, stop and show the failing command/output. Do not create a release.

## Release Notes

Generate release notes using the `release-notes` skill workflow:

- Base: latest published GitHub release tag.
- Head: `origin/main`.
- Compare link should end with `<base>...<version>` in the release body because the tag will exist after release creation.

Write the raw markdown body to a temporary file, such as:

```text
/tmp/release-<version>.md
```

Show the generated notes to the user.

## Review Gate

Before creating the release, state:

- version
- stable release
- target SHA
- comparison base

Ask for explicit confirmation. Do not run `gh release create` until the user clearly approves.

## Create Release

After approval:

```bash
gh release create "<version>" \
    --target "<origin-main-sha>" \
    --title "Release <version>" \
    --notes-file "<notes-file>" \
    --latest
```

After creating the release, report:

- Release URL from `gh release view <version> --json url -q .url`.
- CI is now publishing packages and deploying docs.
- No local version commits or manual publish commands were run.
