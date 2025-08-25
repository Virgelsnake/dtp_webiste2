import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://digitaltechnologypartner.ai', // Production domain for absolute URLs
  integrations: [
    sitemap(),
    tailwind()
  ],
  output: 'static'
});