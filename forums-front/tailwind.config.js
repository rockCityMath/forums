const { ɵNgNoValidate } = require('@angular/forms')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      sky: colors.sky,
      gray: colors.gray,
      black: colors.black,
      white: colors.white,
      red: colors.red,
    },
    extend: {

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
