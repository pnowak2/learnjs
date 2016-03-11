var path = require('path');

module.exports = {
  entry: [
    './src'
  ],
  output: {
    path: 'builds',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js/,
      include: path.join(__dirname, '\src'),
      loader: 'babel'
    }, {
    	test: /\.scss$/,
    	loaders: ['style', 'css', 'sass']
    }, {
    	test: /\.html$/,
    	loader: 'html'
    }]
  }
}