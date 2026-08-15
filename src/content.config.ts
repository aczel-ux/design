import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.enum(['ux-ui', 'web-design', 'brand-logo', 'graphics']),
      client: z.string().optional(),
      role: z.string().optional(),
      year: z.number().int().optional(),
      featured: z.boolean().default(false),
      order: z.number().int().default(100),
      draft: z.boolean().default(false),
      cover: image(),
      coverAlt: z.string().min(1),
      gallery: z.array(z.object({ image: image(), alt: z.string() })).default([]),
      externalUrl: z.url().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
    }),
});

export const collections = { projects };
