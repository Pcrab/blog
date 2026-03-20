import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";
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
