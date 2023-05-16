module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          "0%": {
            filter: "brightness(1.75);",
            transform: "translateY(-100%)",
          },
          "100%": {
            filter: "brightness(1);",
            transform: "translateY(0%)",
          },
        },
      },
      animation: {
        slideDown: "slideDown 250ms ease-in-out",
      }
    },
  },
  plugins: [],
}