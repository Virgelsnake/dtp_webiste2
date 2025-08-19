# Prettier Documentation

## Installation

Install Prettier as a development dependency:

```bash
npm install --save-dev prettier
# or
yarn add --dev prettier
# or
pnpm add --save-dev prettier
```

## Usage

Format all files in the current directory and its subdirectories:

```bash
npx prettier . --write
# or
yarn exec prettier . --write
# or
pnpm exec prettier . --write
```

## Configuration

Create a `.prettierrc.json` file to specify your formatting options:

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

Create a `.prettierignore` file to specify files and directories that Prettier should not format:

```bash
# Ignore artifacts:
build
coverage
```

## Pre-commit Hook (with husky and lint-staged)

You can use `husky` and `lint-staged` to automatically format your files before you commit them.

### npm
```bash
npm install --save-dev husky lint-staged
npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"
```

### yarn
```bash
yarn add --dev husky lint-staged
npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','yarn lint-staged\n')"
```

### pnpm
```bash
pnpm add --save-dev husky lint-staged
pnpm exec husky init
node --eval "fs.writeFileSync('.husky/pre-commit','pnpm exec lint-staged\n')"
```

Then, add the following to your `package.json`:

```json
{
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx,json,css,scss,md}": "prettier --write"
  }
}
```
