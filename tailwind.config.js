module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightGreen: 'rgba(0, 171, 85, 0.08)',
        textGreen: 'rgb(0, 171, 85)',
      },
      boxShadow: {
        'greenShadow': '0px 12px 15px -1px rgba(0,171,85,0.29)'
      }
    },
  },
  variants: {
    extend: {
      visibility: ['hover']
    },
  },
  plugins: [],
}
