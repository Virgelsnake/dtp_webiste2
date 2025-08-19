# ESLint Documentation

## Getting Started

Initialize ESLint in your project:

```bash
npm init @eslint/config
```

## Installation

Install ESLint and the JavaScript plugin:

```bash
npm install eslint@latest @eslint/js@latest --save-dev
```

For `pnpm`, you need to add the following to your `.npmrc` file:

```
auto-install-peers=true
node-linker=hoisted
```

## Usage

Run ESLint on a specific file or directory:

```bash
npx eslint yourfile.js
```

## Configuration

Create an `eslint.config.js` file for your configuration.

### Example for Browser

```javascript
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
	{ files: ["**/*.js"], languageOptions: { globals: globals.browser } },
	{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
]);
```

### Example with Custom Rules

```javascript
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
	{
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
		},
	},
]);
```
