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
            // TODO: Rename to `image`
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
        // TODO: `.transform()` into the object above.
        z.object({ group: z.string(), title: z.string(), image: image() }),
        // TODO: `.transform()` into the object above.
        z.object({ blog: reference("blog") }),
    ]);

// FIXME: These posts should be at `/src/content/projects/posts/`, but currently
// the `loader` property doesn't automatically render markdown files if defined.
const projectPosts = defineCollection({
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            image: image(),
        }),
});

const projects = defineCollection({
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            showItemTitles: z.boolean().default(true),
            // TODO: This should probably fail if they don't have the correct
            // dimmensions.
            banner: image(),
            order: z.number().positive(),
            items: z.array(projectItemSchema(image)),
        }),
});

const talks = defineCollection({
    loader: file("src/content/talks.toml", {
        parser: (text) => parseToml(text).talks,
    }),
    schema: z.object({
        place: z.string(),
        date: z.coerce.date(),
        url: z.string().url(),
        kind: z.enum(["Conference", "Panel", "Meetup"]),
    }),
});

// NOTE: Don't forget to `astro sync` to get any type information.
export const collections = { blog, communities, projects, projectPosts, talks };
