import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const block = z.object({
  title: z.string(),
  body: z.string(),
  points: z.array(z.string()).default([]),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      category: z.string(),
      /** Segmento do cliente ou do produto, ex.: "Provedor de internet" */
      niche: z.string(),
      year: z.number(),
      /** Honestidade: nenhum preview é apresentado como cliente com resultado */
      status: z.enum(['Protótipo publicado', 'Projeto autoral', 'Projeto técnico']),
      summary: z.string().max(160),
      seoDescription: z.string().max(170),
      stack: z.array(z.string()),
      link: z.object({ label: z.string(), href: z.string() }),
      repo: z.string().optional(),
      cover: z.object({ wide: image(), tall: image(), alt: z.string() }),
      gallery: z
        .array(
          z.object({
            src: image(),
            device: z.enum(['desktop', 'mobile']),
            alt: z.string(),
            caption: z.string(),
          }),
        )
        .default([]),
      /** Conteúdo da página do case. Só fatos verificáveis no site publicado ou no repositório. */
      case: z.object({
        lede: z.string(),
        context: z.string(),
        objective: z.string(),
        role: z.string(),
        problem: z.string(),
        strategy: z.string(),
        direction: block.extend({
          tokens: z
            .array(z.object({ label: z.string(), value: z.string(), color: z.string().optional() }))
            .default([]),
        }),
        implementation: z.object({ body: z.string(), points: z.array(z.string()) }),
        quality: block.optional(),
        limitations: z.array(z.string()),
      }),
    }),
});

export const collections = { projects };
