import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { light: "#BF77FF", DEFAULT: "#A94AFF", dark: "#9721FF" },
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
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animated"),
  ],
};
export default config;
