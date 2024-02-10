/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, ts, tsx}"],
  theme: {
    container: {
      padding: "2rem",
      center: true,
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), "prettier-plugin-tailwindcss"],
};
