/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: "se",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#6a3da5",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#5d2057",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bungee: ["Matemasie", "sans-serif"],
        cursive: ["Caveat", "sans-serif"],
        capital: ["Permanent Marker", "sans-serif"],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
