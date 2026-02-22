import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
  }),
});

const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    pubDate: z.date(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
  }),
});

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const testimonialsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    quote: z.string(),
  }),
});

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Digital Technology Partner'),
    category: z.enum(['AI', 'Digital Transformation', 'Automation', 'Operations', 'Strategy']),
    tags: z.array(z.string()).default([]),
    approved: z.boolean().default(false),
    approvedBy: z.string().optional(),
    approvedAt: z.date().optional(),
    source: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  'case-studies': caseStudiesCollection,
  services: servicesCollection,
  testimonials: testimonialsCollection,
  news: newsCollection,
};
