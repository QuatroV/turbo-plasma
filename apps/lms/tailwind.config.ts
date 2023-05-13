import type { Config } from "tailwindcss";

import baseConfig from "@plasma/tailwind-config";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },

  plugins: [require("@tailwindcss/container-queries")],

  presets: [baseConfig],
} satisfies Config;
