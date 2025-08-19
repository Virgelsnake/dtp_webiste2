import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://yourcompany.com', // Replace with actual domain
  integrations: [
    sitemap(),
    tailwind()
  ],
  output: 'static'
});