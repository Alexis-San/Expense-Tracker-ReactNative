/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./screens/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        expense: "#fa805f",
        income: "#7e31f9",
        primary: "#8033f7",
      },
    },
  },
  plugins: [],
};
