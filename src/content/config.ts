import {
    defineCollection,
    reference,
    z,
    type ImageFunction,
} from "astro:content";
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
            // TODO: Convert `Actual` to the current year.
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

const projectItemSchema = (image: ImageFunction) =>
    z.union([
        z.object({
            title: z.string(),
            url: z.string().url(),
            image: image(),
        }),
        // TODO: .transform() into the object above.
        z.object({ blog: reference("blog") }),
    ]);

const projects = defineCollection({
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            showItemTitles: z.boolean().default(true),
            // TODO: This should probably fail if they don't have the correct
            // dimmensions.
            banner: image(),
            order: z.number().positive(),
            // FIXME: Remove optional when all projects have content.
            items: z.array(projectItemSchema(image)).optional(),
        }),
});

// NOTE: Don't forget to `astro sync` to get any type information.
export const collections = { blog, communities, projects };
