// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.baldwinson.com',
  output: 'server',
  adapter: vercel(),
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'tailwind-merge',
        'clsx', 
        'class-variance-authority',
        '@radix-ui/react-slot',
        '@radix-ui/react-dialog'
      ]
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'ui-utils': ['tailwind-merge', 'clsx', 'class-variance-authority']
          }
        }
      }
    }
  }
});