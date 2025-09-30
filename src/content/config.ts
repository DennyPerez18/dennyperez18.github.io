import {
  defineCollection,
  reference,
  z,
  type ImageFunction,
} from "astro:content";
import { file, glob } from "astro/loaders";
import { parse as parseToml } from "toml";

// strips out "/index.md" prefix.
const stripIndexMd = (opts: { entry: string }) =>
  opts.entry.replace(/\/index\.md[x]?$/, "");

const blog = defineCollection({
  loader: glob({
    pattern: "**/index.md*",
    base: "./src/content/blog",
    generateId: stripIndexMd,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      // FIXME: This property is not longer needed, since the path is always
      // `blog/[id]/banner.[ext]`
      heroImage: image(),
      tags: z.string().array(),
      // TODO: wordCount
    }),
});

const communities = defineCollection({
  loader: file("src/content/communities/communities.toml", {
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

const projectPosts = defineCollection({
  loader: glob({
    pattern: "*/posts/**/index.md*",
    base: "./src/content/projects",
    generateId: stripIndexMd,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
    }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "*/index.md",
    base: "./src/content/projects",
    generateId: stripIndexMd,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      showItemTitles: z.boolean().default(true),
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
    kind: z.enum(["Conference", "Panel", "Meetup"]),
  }),
});

// NOTE: Don't forget to `astro sync` to get any type information.
export const collections = { blog, communities, projects, projectPosts, talks };
