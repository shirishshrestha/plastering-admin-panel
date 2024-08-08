/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#182C3A",
        secondary: "#8BB4C8",
        light: "#f0fbff",
      },
    },
  },
  plugins: [],
};
