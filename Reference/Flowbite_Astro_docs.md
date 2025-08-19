# Using Flowbite with Astro and Tailwind CSS

This guide provides a step-by-step process for setting up an Astro project with Tailwind CSS and Flowbite.

## Prerequisites

- **Node.js**: Ensure you have Node.js version 16.12.0 or higher installed.
- **VS Code Extension**: It's recommended to use the official [Astro language support extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) for VS Code.

## 1. Create a New Astro Project

Use the following command to create a new Astro project:

```bash
npm create astro@latest your-project-name
cd your-project-name
```

To start the development server, run:

```bash
npm run dev
```

The project will be available at `http://localhost:4321`.

To create a production build, run:

```bash
npm run build
```

## 2. Install and Configure Tailwind CSS

Use the Astro CLI to add Tailwind CSS to your project:

```bash
npx astro add tailwind
```

This command will:
- Install Tailwind CSS.
- Create a `tailwind.config.cjs` file.
- Configure the project to use Tailwind CSS.

Next, import the global stylesheet in your `src/layouts/Layout.astro` file:

```astro
---
import "../styles/global.css";
---
```

## 3. Install and Configure Flowbite

1.  **Install Flowbite**:

    ```bash
    npm install flowbite --save
    ```

2.  **Configure Tailwind CSS to use Flowbite**:
    Add the Flowbite plugin to your `tailwind.config.cjs` file and include Flowbite in your content paths:

    ```javascript
    module.exports = {
      content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './node_modules/flowbite/**/*.js'
      ],
      theme: {
        extend: {},
      },
      plugins: [
        require('flowbite/plugin')
      ],
    }
    ```

## 4. Using Flowbite's JavaScript

To enable interactive components, you need to include Flowbite's JavaScript.

### Option A: Using the CDN

Add the following script tag just before the closing `</body>` tag in your `src/layouts/Layout.astro` file:

```html
<script is:inline src="https://cdn.jsdelivr.net/npm/flowbite@latest/dist/flowbite.min.js"></script>
```

### Option B: Importing as a Module

You can import Flowbite's JavaScript directly into your Astro components for more complex interactions.

In a `<script>` tag within your `.astro` file:

```javascript
import { Modal } from 'flowbite';

const $buttonElement = document.querySelector('#button');
const $modalElement = document.querySelector('#modal');

const modal = new Modal($modalElement);

if ($buttonElement) {
  $buttonElement.addEventListener('click', () => modal.toggle());
}
```
