import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/tictactoe/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/minesweeper/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/snake/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      gridTemplateColumns: {
        "20": "repeat(20, minmax(0, 1fr))",
      },
    },
  },
  daisyui: {
    themes: ["nord", "business"],
  },
  darkMode: ["selector", '[data-theme="business"'],
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
} satisfies Config;
