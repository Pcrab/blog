import { defineConfig, presetTypography, presetUno } from "unocss";

export default defineConfig({
    presets: [
        presetUno({
            dark: "media",
        }),
        presetTypography(),
    ],
});
