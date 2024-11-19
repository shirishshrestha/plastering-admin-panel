const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#182C3A",
        secondary: "#8BB4C8",
        light: "#f0fbff",
        edit: "#8c62ff",
        editBackground: "#f4efff",
        view: "#3e84f4",
        viewBackground: "#ecf3fe",
        delete: "#e03137",
        deleteBackground: "#fee9f1",
        accent: "#649df9",
        highlight: "#FF5733",
      },
      gridTemplateColumns: {
        custom: "repeat(auto-fit, minmax(230px, 1fr))",
        business: "repeat(auto-fit, minmax(250px, 1fr))",
      },
      animation: {
        "pulse-fast": "pulse 1s linear infinite",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
