/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./html/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#8BC8FE",
        "primary-light": "#ABDCFF",
        "primary-dark": "#699AC7",
        "background": "#28333F",
      }
    },
  },
  
}