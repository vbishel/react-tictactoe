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
      },
      keyframes: {
        scaleOut: {
          "0%": {
            transform: "scale(1)"
          },
          "100%": {
            transform: "scale(0)"
          }
        },
        scaleIn: {
          "0%": {
            transform: "scale(0)"
          },
          "80%": {
            transform: "scale(1.2)"
          },
          "100%": {
            transform: "scale(1)"
          }
        }
      },
      animation: {
        scaleOut: "scaleOut 0.3s ease forwards",
        scaleIn: "scaleIn 0.5s ease forwards"
      }
    },
  },
  
}