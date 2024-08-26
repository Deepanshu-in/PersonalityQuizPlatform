/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: "se",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
