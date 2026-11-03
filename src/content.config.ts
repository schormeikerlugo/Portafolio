import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localized = z.object({
  title: z.string(),
  tagline: z.string(),
  summary: z.string(),
  challenge: z.array(z.string()).min(1),
  approach: z.string(),
  outcome: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      legacyId: z.number().optional(),
      year: z.number(),
      featured: z.number().optional(),
      status: z.enum(['live', 'released', 'unpublished', 'concept', 'wip']),
      type: z.enum(['personal', 'client', 'concept', 'professional', 'open-source']),
      category: z.enum(['design', 'development']),
      subcategory: z.enum(['crypto', 'games', 'app', 'web', 'dashboard', 'ai', 'tools']),
      workflow: z.enum(['design', 'development', 'ai']).optional(),
      stack: z.array(z.string()),
      role: z.array(z.string()),
      links: z
        .object({
          live: z.string().url().optional(),
          repo: z.string().url().optional(),
          behance: z.string().url().optional(),
          dribbble: z.string().url().optional(),
        })
        .default({}),
      cover: image(),
      gallery: z.array(image()).default([]),
      es: localized,
      en: localized,
    }),
});

export const collections = { projects };
