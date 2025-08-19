# Astro Documentation

## Create New Astro Project (npm)
This command initiates the creation of a new Astro project using npm. It guides the user through setup options via a CLI wizard. Ensure Node.js and npm are installed before execution.

```sh
npm create astro@latest
```

## Create New Astro Project with create-astro
Use the `create astro` command-line tool to start a new Astro project. This command guides you through project setup, including choosing a template and installing dependencies.

```npm
npm create astro@latest
```

```pnpm
pnpm create astro@latest
```

```yarn
yarn create astro
```

## Install Dependencies and Run Project Locally
Instructions for installing project dependencies using pnpm and starting the local development server. Ensure you have pnpm installed before running these commands.

```shell
pnpm install
```

```shell
pnpm run dev
```

## astro:build:setup Example
Example demonstrating how to use the `astro:build:setup` hook to access Vite configuration, page data, and the build target within an Astro integration.

```js
export default {
  name: 'my-integration',
  hooks: {
    'astro:build:setup': ({ vite, pages, target, updateConfig }) => {
      const { publicDir, root } = vite;
      console.log(publicDir, root);

      pages.forEach((data) => {
        if (data.route.pattern.test("/blog")) {
          console.log(data.route.type);
        }
      });

      if (target === "server") {
        // do something in server build phase
      }

      // Example: Supplying a plugin to the user's project
      // import awesomeCssPlugin from 'awesome-css-vite-plugin';
      // updateConfig({
      //   plugins: [awesomeCssPlugin()],
      // });
    },
  }
}
```

And so on for all the snippets...
