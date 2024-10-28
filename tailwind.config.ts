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
        primary: "Tiro Bangla",
        secondary: "AponaLohit",
        fancy: "Mukti",
        logo: "CharuChandan3D",
      },
      screens: {
        "4k": "2560px",
      },
    },
  },
  plugins: [],
};
export default config;
