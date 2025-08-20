import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    markdown: {
        shikiConfig: {
            theme: "catppuccin-latte",
        },
    },

    site: "https://dennyperez.dev/",
    integrations: [mdx(), sitemap()],

    vite: {
        plugins: [tailwindcss()],
    },
});
