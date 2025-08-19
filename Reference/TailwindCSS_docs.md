# Tailwind CSS Documentation

## Install dependencies for Tailwind CSS documentation

This command installs all necessary project dependencies using pnpm, a fast, disk-space efficient package manager. It should be run once after cloning the repository to set up the development environment.

```bash
pnpm install
```

## Run Tailwind CSS documentation development server

This command starts the local development server for the Tailwind CSS documentation. It leverages Next.js to provide a hot-reloading environment, allowing developers to see changes in real-time as they modify the source code.

```bash
pnpm run dev
```

## Install Tailwind CSS v4 Alpha and CLI Package

Installs the `tailwindcss@next` and `@tailwindcss/cli@next` packages using npm, providing the necessary tools to use Tailwind CSS directly via its command-line interface without a PostCSS setup.

```sh
npm install tailwindcss@next @tailwindcss/cli@next
```

## Install or Upgrade Tailwind CSS via npm

This command allows users to install the latest version of the Tailwind CSS framework as a development dependency in their project. It's the standard way to get started or update an existing Tailwind CSS installation.

```sh
npm install -D tailwindcss@latest
```

## Install Tailwind CSS Line Clamp Plugin

This shell command installs the `@tailwindcss/line-clamp` plugin using npm. It's the first step to integrate the plugin into a project, making its utility classes available for use.

```sh
npm install @tailwindcss/line-clamp
```

## Troubleshooting

### PostCSS Build Error with `@import 'tailwindcss'`

If you encounter a build error related to PostCSS and an "Unknown word" message, it is likely because you are using `@import 'tailwindcss';` in your global CSS file.

**Solution:**

Replace the single import statement with the three core Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
