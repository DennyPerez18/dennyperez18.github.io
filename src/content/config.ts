import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";
import { parse as parseToml } from "toml";

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

const communities = defineCollection({
    loader: file("src/content/communities.toml", {
        parser: (text) => parseToml(text).communities,
    }),
    schema: ({ image }) =>
        z.object({
            role: z.string(),
            // TODO: A class would probably make handling these less messy.
            years: z.string().transform((val) => {
                let [start, end] = val.split("-").map((val) => val.trim());

                let parsedEnd;
                if (end != "Actual") parsedEnd = parseInt(end);
                else parsedEnd = end;

                return { start: parseInt(start), end: parsedEnd };
            }),
            url: z.string().url(),
            icon: image().optional(),
            description: z.string(),
        }),
});

const projects = defineCollection({
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            // TODO: This should probably fail if they don't have the correct
            // dimmensions.
            banner: image(),
            order: z.number().positive(),
        }),
});

// NOTE: Don't forget to `npm run astro sync` to get any type information.
export const collections = { blog, communities, projects };
