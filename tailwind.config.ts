import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ["Unbounded", "sans-serif"], // Add your font family
      },
    },
  },
  plugins: [],
} satisfies Config;
