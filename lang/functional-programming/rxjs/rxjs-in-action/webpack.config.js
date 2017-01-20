var path = require('path');

module.exports = {
  entry: [
    'mocha!./specs/1-think-functionally.spec.js',
    'mocha!./specs/2-higher-order-javascript.spec.js',
    'mocha!./specs/3-few-data-structures-many-operations.spec.js',
    'mocha!./specs/4-towards-modular-reusable-code.spec.js'
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