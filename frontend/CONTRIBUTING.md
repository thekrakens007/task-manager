# Contributing

Bug fixes, accessibility improvements, and clearer documentation are welcome. For changes to the template's navigation, dependencies, or visual direction, open an issue first so the scope can be discussed before you build it.

## Work locally

Fork the repository, clone your fork, and create a branch for your change. Use the Bun version in `.bun-version`.

```bash
bun install --frozen-lockfile
bun run dev
```

The login accepts any nonempty username and password. The Google button also opens the demo. Neither flow contacts an authentication provider. Use sample data only.

## Make a change

Keep each pull request focused on one problem. Place feature code in `src/features`, route entry points in `src/pages`, and shared controls in `src/components`.

Read [AGENTS.md](./AGENTS.md) for the repository's implementation rules. Check current official documentation before changing a library pattern. Reuse the local beui components and theme tokens. Preserve keyboard access, reduced-motion behavior, and browser autofill.

TypeScript must stay strict. Fix type and lint errors at their source; do not use `any`, unchecked casts, suppression comments, or weaker compiler settings to bypass them. Add behavioral tests when a change affects logic. Keep `bun.lock` in sync when dependencies change.

For interface changes, check 360px and 390px phone widths, tablet, and desktop. Verify navigation, long text, validation, and scroll behavior. A desktop table may need a different layout on a phone. Include before and after screenshots in the pull request.

## Validate and submit

```bash
bun run format
bun run check
git diff --check
```

`check` runs TypeScript, ESLint with zero warnings, tests, and the production build. Also inspect the browser console for interface changes. Explain any check you could not run.

Use a short title that names the change. Describe the problem, resulting behavior, and validation. Link the related issue with `Fixes #123` when the pull request resolves it. Keep generated builds, secrets, personal data, and temporary reference repositories out of the diff.

Update the README if setup or behavior changes. Refresh affected images using the [screenshot guide](./docs/screenshots/README.md). Retain license notices for copied or adapted code.

## Reports and review

Use the [bug report or feature request forms](https://github.com/youssefsz/dashboard-template-react-vite/issues/new/choose). Include a small reproduction and the browser or Bun version when relevant. Report vulnerabilities through [SECURITY.md](./SECURITY.md), not a public issue.

Follow the [code of conduct](./CODE_OF_CONDUCT.md). Maintainers may ask for a smaller scope or an alternative approach before accepting a change. Contributions are distributed under the repository's [MIT license](./LICENSE).
