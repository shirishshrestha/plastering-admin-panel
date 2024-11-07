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
      },
      gridTemplateColumns: {
        custom: "repeat(auto-fit, minmax(200px, 1fr))",
      },
      outline: {
        none: "none",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
