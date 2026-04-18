import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://schormeiker.com',
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        // Home pages get highest priority
        if (item.url === 'https://schormeiker.com/' || item.url === 'https://schormeiker.com/en/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/work') || item.url.includes('/services') || item.url.includes('/about')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/portfolio/') || item.url.includes('/writing/')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.5;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
