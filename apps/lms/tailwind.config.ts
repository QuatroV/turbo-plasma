import type { Config } from "tailwindcss";

import baseConfig from "@plasma/tailwind-config";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      keyframes: {
        squeeze: {
          "0%": { transform: "scale(2)", opacity: "0.1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        squeeze: "squeeze 0.25s linear",
      },
    },
  },

  plugins: [require("@tailwindcss/container-queries")],

  presets: [baseConfig],
} satisfies Config;
