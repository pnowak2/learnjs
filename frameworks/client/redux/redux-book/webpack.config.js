var path = require('path');

module.exports = {
  entry: [
    'mocha!./specs/1-core-concepts.spec.js',
    'mocha!./src/1-core-concepts/1-real-redux.js',
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