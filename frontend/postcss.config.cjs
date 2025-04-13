const tailwindcssPlugin = require('@tailwindcss/postcss')

module.exports = {
  plugins: [
    tailwindcssPlugin(),
    require('autoprefixer'),
  ],
}
