/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,ts,tsx}"],
    theme: {
        extend: {},
        screens: {
            sm: {
                min: "0px",
                max: "700px",
            },
            md: {
                min: "701px",
                max: "1280px",
            },
            lg: {
                min: "1281px",
            },
        },
    },
    darkMode: "class",
    plugins: [require("@tailwindcss/typography")],
};
