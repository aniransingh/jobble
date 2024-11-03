import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: "var(--color-accent)",
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                border: "var(--color-border)",
                button: "var(--color-button)",
                tooltip: "var(--color-tooltip)",
                "text-primary": "var(--color-text-primary)",
                "text-primary-alt": "var(--color-text-primary-alt)",
                "text-secondary": "var(--color-text-secondary)",
                "text-tooltip": "var(--color-text-tooltip)",
                "accent-hover": "var(--color-accent-hover)",
            },
            backgroundImage: {
                "grad-card-1": "var(--grad-card-1)",
                "grad-card-2": "var(--grad-card-2)",
                "grad-card-3": "var(--grad-card-3)",
                "grad-card-4": "var(--grad-card-4)",
                "grad-card-5": "var(--grad-card-5)",
                "grad-card-6": "var(--grad-card-6)",
                "grad-card-7": "var(--grad-card-7)",
                "grad-card-8": "var(--grad-card-8)",
                "grad-card-9": "var(--grad-card-9)",
                "grad-card-10": "var(--grad-card-10)",
                "grad-broken-hearts": "var(--grad-broken-hearts)",
                "grad-wiretap": "var(--grad-wiretap)",
                "grad-wedding-day": "var(--grad-wedding-day)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
