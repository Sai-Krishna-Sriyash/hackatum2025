import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-rubik)", "sans-serif"],
      },
      colors: {
        minga: {
          // This syntax allows opacity modifiers like bg-minga-mint/50
          mint: "rgb(var(--minga-mint) / <alpha-value>)",
          green: "rgb(var(--minga-green) / <alpha-value>)",
          teal: "rgb(var(--minga-teal) / <alpha-value>)",
          blue: "rgb(var(--minga-blue) / <alpha-value>)",
        },
        "minga-mint": "rgb(var(--minga-mint) / <alpha-value>)",
        "minga-green": "rgb(var(--minga-green) / <alpha-value>)",
        "minga-teal": "rgb(var(--minga-teal) / <alpha-value>)",
        "minga-blue": "rgb(var(--minga-blue) / <alpha-value>)",
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(38, 102, 127, 0.1)',
        'glow': '0 0 20px rgba(103, 192, 144, 0.5)',
      }
    },
  },
  plugins: [],
};
export default config;