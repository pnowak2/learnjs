module.exports = ctx => ({
  plugins: [
    require('postcss-import')(),
    require('precss')(),
    require('autoprefixer')({
      'browsers': '> 5%'
    })
  ]
})