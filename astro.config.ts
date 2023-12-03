import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://blog.pcrab.xyz",
    integrations: [
        UnoCSS({
            injectReset: true,
        }),
        robotsTxt(),
        sitemap(),
    ],
});
