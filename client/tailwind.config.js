/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Inter is now the default sans-serif font (Apple-like)
        // Use with: font-sans (applied by default to body)
        sans: ["Inter", "sans-serif"],

        // Lora is available for an elegant, classic look
        // Use with: font-serif
        serif: ["Lora", "serif"],

        // JetBrains Mono is available for a clean, technical look
        // Use with: font-mono
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        "brand-orange": {
          DEFAULT: "#F58220",
          light: "#F79A4A",
          dark: "#D86A1B",
        },
        "brand-cream": "#FEFDEB",
        "brand-dark": {
          DEFAULT: "#2D2D2D",
          light: "#3A3A3A",
        },
        "brand-light": "#F7F7F7",
      },
    },
  },
  plugins: [],
};
