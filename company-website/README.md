# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---

## Deployment Strategy (DTP)

- **Production host**: `https://digitaltechnologypartner.ai` (Netlify)
- **Production branch**: `main` only. Netlify builds and deploys automatically on pushes to `main`.
- **Development branch**: `development` for ongoing work and local/test-browser verification. Netlify branch deploys are not used.

 

### Develop locally

- Create PRs targeting `development` or commit directly to `development` for rapid iteration.

- Run locally:

  ```bash
  npm install
  npm run dev
  ```

 

### Deploy to production

- Merge `development` → `main` (or commit to `main`). Netlify will auto-deploy.
- To force a rebuild without code changes, use Netlify UI: "Trigger deploy" → "Clear cache and deploy site".

### Netlify config
- See `netlify.toml` for build command, publish dir, headers, and redirects.
- Redirects include `/news → /news2` and `/home1 → /`.

### Favicons / cache
- Icons live in `public/` and are linked in `src/layouts/Layout.astro`.
- Browsers cache favicons aggressively; use hard reload or add a query string (e.g. `?v=2`) if needed.
