var path = require('path');

module.exports = {
  entry: [
    'mocha!./specs/1-functions.spec.js'
  ],
  output: {
    path: 'builds',
    filename: 'specs-bundle.js'
  },
  module: {
    loaders: [{
      test: /\.spec.js/,
      include: path.join(__dirname, 'specs'),
      loader: 'babel'
    }, {
      test: /\.js/,
      include: path.join(__dirname, 'src'),
      loader: 'babel'
    }]
  }
};