import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A94AFF",
        secondary: "#ffba28",
      },
      borderWidth: {
        "3": "3px",
      },
      fontFamily: {
        arabic: ["var(--font-noto-sans-arabic"],
        latin: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
export default config;
