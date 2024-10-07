import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            pubDate: z.coerce.date(),
            heroImage: image(),
            categories: z.string().array(),
        }),
});

// TODO: Load data from a toml file.
// TODO: Tags field.
const project = defineCollection({
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            role: z.string(),
            // TODO: A class would probably make handling these less messy.
            years: z.string().transform((val) => {
                let [start, end] = val.split("-").map((val) => val.trim());

                let parsedEnd;
                if (end != "Actual") parsedEnd = parseInt(end)
                else parsedEnd = end;

                return { start: parseInt(start), end: parsedEnd };
            }),
            // TODO: Rename to `url`.
            link: z.string().url(),
            icon: image().optional(),
        }),
});

export const collections = { blog, project };
