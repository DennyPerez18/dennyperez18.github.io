import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            // Transform `string` to `Date` object
            pubDate: z
                .string()
                .or(z.date())
                .transform((val) => new Date(val)),
            heroImage: image(),
            categories: z.string().array(),
        }),
});

const project = defineCollection({
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            role: z.string(),
            years: z.string(),
            link: z.string().url(),
            icon: image().optional(),
        }),
});

export const collections = { blog, project };
