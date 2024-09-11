function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue: number }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgba(var(${variableName}))`;
  };
}

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: withOpacity("--color-primary-light"),
          DEFAULT: withOpacity("--color-primary"),
          dark: withOpacity("--color-primary-dark"),
        },
        status: {
          base: withOpacity("--color-status-base"),
          success: withOpacity("--color-status-success"),
          warning: withOpacity("--color-status-warning"),
          danger: withOpacity("--color-status-danger"),
        },
      },
      backgroundColor: {
        skin: {
          base: withOpacity("--color-background-base"),
          secondary: withOpacity("--color-background-secondary"),
          tertiary: withOpacity("--color-background-tertiary"),
          muted: withOpacity("--color-background-muted"),
          inverted: {
            DEFAULT: withOpacity("--color-background-inverted"),
            muted: withOpacity("--color-background-inverted-muted"),
          },

          overlay: {
            DEFAULT: withOpacity("--color-background-overlay")({
              opacityValue: 0.5,
            }),
            muted: withOpacity("--color-background-overlay-muted")({
              opacityValue: 0.8,
            }),
          },
        },
      },
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          secondary: withOpacity("--color-text-secondary"),
          tertiary: withOpacity("--color-text-tertiary"),
          inverted: withOpacity("--color-text-base-inverted"),
          link: {
            base: withOpacity("--color-text-link-base"),
            hover: withOpacity("--color-text-link-base-hover"),
          },
          icon: {
            base: withOpacity("--color-icon-base"),
            muted: withOpacity("--color-icon-muted"),
            inverted: withOpacity("--color-icon-inverted"),
            like: withOpacity("--color-icon-like"),
            repost: withOpacity("--color-icon-repost"),
          },
        },
      },
      borderColor: {
        skin: {
          base: withOpacity("--color-border-base"),
          secondary: withOpacity("--color-border-secondary"),
        },
      },
      borderWidth: {
        "3": "3px",
      },
      outlineColor: {
        skin: {
          base: withOpacity("--color-outline-base"),
        },
      },
      fontFamily: {
        arabic: ["var(--font-noto-sans-arabic"],
        latin: ["var(--font-inter)"],
      },
    },
  },
  plugins: [    
    require("tailwindcss-animated"),
  ],
};
