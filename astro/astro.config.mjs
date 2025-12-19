// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://baldwinson.com',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});