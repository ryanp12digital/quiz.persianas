/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--hu-border))",
                input: "hsl(var(--hu-input))",
                ring: "hsl(var(--hu-ring))",
                background: "hsl(var(--hu-background))",
                foreground: "hsl(var(--hu-foreground))",
                primary: {
                    DEFAULT: "hsl(var(--hu-primary))",
                    foreground: "hsl(var(--hu-primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--hu-secondary))",
                    foreground: "hsl(var(--hu-secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--hu-destructive))",
                    foreground: "hsl(var(--hu-destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--hu-muted))",
                    foreground: "hsl(var(--hu-muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--hu-accent))",
                    foreground: "hsl(var(--hu-accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--hu-background))",
                    foreground: "hsl(var(--hu-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--hu-card))",
                    foreground: "hsl(var(--hu-card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [],
}
