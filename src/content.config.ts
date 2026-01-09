import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Shared schema for blog posts
const postSchema = ({ image }: { image: () => z.ZodType<any> }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    tags: z.string().array().optional(),
    publish: z.boolean().default(true),
    location: z.string().optional(),
    // Optional: link to translated version by slug
    translationSlug: z.string().optional(),
  });

// Korean posts collection
const blogKo = defineCollection({
  loader: glob({ base: "./src/content/blog/ko", pattern: "**/*.{md,mdx}" }),
  schema: postSchema,
});

// English posts collection
const blogEn = defineCollection({
  loader: glob({ base: "./src/content/blog/en", pattern: "**/*.{md,mdx}" }),
  schema: postSchema,
});

export const collections = {
  'blog-ko': blogKo,
  'blog-en': blogEn,
};
