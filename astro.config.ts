import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

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
