# Using shadcn/ui with Astro

This guide provides a step-by-step process for setting up an Astro project with `shadcn/ui`.

## 1. Create a New Astro Project

Start by creating a new Astro project with Tailwind CSS and the React integration:

```bash
npm dlx create-astro@latest astro-app --template with-tailwindcss --install --add react --git
```

## 2. Configure `tsconfig.json`

To use path aliases (e.g., `@/*`), add the `baseUrl` and `paths` properties to your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

## 3. Initialize shadcn/ui

Run the `shadcn/ui` init command to set up your project:

```bash
npm dlx shadcn-ui@latest init
```

This command will guide you through the setup process, including configuring your `tailwind.config.cjs` and global CSS.

## 4. Add and Use Components

Once `shadcn/ui` is initialized, you can add components to your project using the CLI.

For example, to add the `Button` component:

```bash
npm dlx shadcn-ui@latest add button
```

You can then import and use the component in your `.astro` files:

```astro
---
import { Button } from "@/components/ui/button";
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Astro + shadcn/ui</title>
  </head>
  <body>
    <div class="grid place-items-center h-screen content-center">
      <Button>Click me</Button>
    </div>
  </body>
</html>
```
