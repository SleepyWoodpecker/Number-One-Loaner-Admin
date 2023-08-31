/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }
      "mid-point-1": "420px",
      "mid-point-2": "475px",
      "mid-point-3": "500px",
      "mid-point-4": "800px",
      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
