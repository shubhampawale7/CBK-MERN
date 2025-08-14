// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // NEW: Added a professional, readable font.
      // Add this font to your index.html from Google Fonts:
      // <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      // NEW: Color palette derived from the CBK brochure.
      colors: {
        "brand-orange": {
          DEFAULT: "#F58220", // A strong orange from the brochure
          light: "#F79A4A",
          dark: "#D86A1B",
        },
        "brand-cream": "#FEFDEB", // The light yellowish background color from the brochure
        "brand-dark": {
          DEFAULT: "#2D2D2D", // A dark charcoal for a strong industrial feel
          light: "#3A3A3A",
        },
        "brand-light": "#F7F7F7", // A very light gray for section backgrounds
      },
    },
  },
  plugins: [],
};
