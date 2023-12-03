const eslintConfig = require("@pcrab/configs-eslint-ts");

module.exports = {
    ...eslintConfig,
    extends: [...eslintConfig.extends, "plugin:astro/recommended"],
    overrides: [
        {
            files: ["*.astro"],
            parser: "astro-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                sourceType: "module",
                allowImportExportEverywhere: true,
                extraFileExtensions: [".astro"],
            },
        },
    ],
};
