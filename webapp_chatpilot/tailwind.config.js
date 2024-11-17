/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#915EFF",
        primaryHeading: "#ffffff",
        secondaryHeading: "#915EFF",
      },
      backgroundImage: {
        "hero-bg": "url('/src/assets/dark-hero-bg.png')",
        "hero-bg-light": "url('/src/assets/light-hero-bg.png')",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
