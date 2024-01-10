/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                dancing: ["Dancing Script", "cursive"],
            },
            container: {
                center: true,
                padding: {
                    default: "1rem",
                    md: "3rem",
                },
            },
        },
    },
    plugins: [],
};
