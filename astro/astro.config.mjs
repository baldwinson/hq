// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.baldwinson.com',
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()],

  build: {
    // Inline all stylesheets to eliminate render-blocking CSS requests
    inlineStylesheets: 'always',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});