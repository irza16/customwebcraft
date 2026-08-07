import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0B",
          secondary: "#121214",
        },
        accent: {
          gold: "#C9972E",
          muted: "#8A6A2E",
        },
        text: {
          heading: "#F7F1E8",
          body: "#A8A39A",
        },
        support: {
          terracotta: "#8C4A34",
        },
        line: "#24242A",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "shutter-ribbing": "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
