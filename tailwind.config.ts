import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        background: "#FFFFFF",
        foreground: "#666461",
        border: "#BABABA",
        primary: {
          "100": "#EAD8B0", // lightest secondary yellow
          color1: "#A1AA8A", // main green
          color2: "#666461", // dark gray
          hover: "#838C6E", // secondary green
          color3: "#FFFFFF", // white
          color4: "#E0E0E0", // existing light gray
        },
        darkMod: {
          "100": "#666461", // dark gray
          "200": "#5A5A58",
          "300": "#4E4E4C",
          "400": "#424240",
          "500": "#363634",
          "600": "#2A2A28",
          "700": "#1E1E1C",
          DEFAULT: "#666461", // dark gray
        },
        tertiary: "#E2C675", // main yellow
        secondary: "#DB9F9A", // main pink
        black: {
          "100": "#666461", // dark gray
          "200": "#4E4E4C",
          "300": "#BABABA", // secondary gray
          DEFAULT: "#000000",
        },
        white: {
          "100": "#FFD7D4", // lightest pink
          DEFAULT: "#FFFFFF",
        },
        sidebar: {
          DEFAULT: "#F7F7F7",
          foreground: "#666461",
          primary: "#838C6E",
          "primary-foreground": "#FFFFFF",
          accent: "#E2C675",
          "accent-foreground": "#666461",
          border: "#E0E0E0",
          ring: "#838C6E",
        },
      },
      fontFamily: {
        zain: ["var(--font-zain)"],
        poppins: ["Poppins", "sans-serif"],
        sans: ["var(--font-noto-kufi-arabic)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "100": "2px 2px 0px 0px rgb(0, 0, 0)",
        "200": "2px 2px 0px 2px rgb(0, 0, 0)",
        "300": "2px 2px 0px 2px #DB9F9A", // using main pink
      },
      animation: {
        "bounce-x": "bouncex 1s infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        bouncex: {
          "0%, 100%": {
            transform: "translateX(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, value]) => [`--${key}`, value])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
