import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import yaml from 'js-yaml';

// Legacy numeric project URLs (/portfolio/34) → slug URLs
const projectsDir = new URL('./src/content/projects/', import.meta.url);
const redirects = {};
for (const file of fs.readdirSync(projectsDir).filter((f) => f.endsWith('.yaml'))) {
  const slug = file.replace(/\.yaml$/, '');
  const { legacyId } = yaml.load(fs.readFileSync(new URL(file, projectsDir), 'utf8'));
  if (legacyId === undefined) continue;
  redirects[`/portfolio/${legacyId}`] = `/portfolio/${slug}`;
  redirects[`/en/portfolio/${legacyId}`] = `/en/portfolio/${slug}`;
}

export default defineConfig({
  site: 'https://schormeiker.com',
  redirects,
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
