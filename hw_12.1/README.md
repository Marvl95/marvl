# HW 12.1 — Code quality

Prettier and ESLint are configured in the project root.

## Commands

```bash
npm run lint          # check JS with ESLint
npm run lint:fix      # auto-fix ESLint issues
npm run format        # format with Prettier
npm run format:check  # check formatting only
```

## Pre-commit

Before each commit, Husky runs ESLint on staged `*.js` files via `lint-staged`.
