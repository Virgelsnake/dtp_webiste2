import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  // ESLint's recommended rules
  {
    rules: {
      // your rules
    }
  },

  // TypeScript-ESLint's recommended rules
  ...tseslint.configs.recommended,

  // Astro's recommended rules
  // (this includes rules for Astro, Prettier, and TypeScript)
  ...eslintPluginAstro.configs.recommended,

  {
    // Global ignores
    ignores: [
      "node_modules/",
      "dist/",
      ".astro/",
      "*.cjs",
      "*.mjs"
    ]
  }
];
