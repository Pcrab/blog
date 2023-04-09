module.exports = {
    ...require("@pcrab/prettier-config"),
    plugins: [require.resolve("prettier-plugin-astro")],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro"
            }
        }
    ]
};