/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        beatrice: ['"Beatrice Deck Trial"', 'serif'],
      },
      colors: {
        violet: {
          400: "#a78bfa",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        gray: {
          900: "#111827",
          800: "#1f2937",
          700: "#374151",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};
