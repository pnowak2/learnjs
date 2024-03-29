var path = require('path');

module.exports = {
  entry: [
    'mocha!./specs/1-blockBinding.spec.js',
    'mocha!./specs/2-stringsAndRegexp.spec.js',
    'mocha!./specs/3-functions.spec.js',
    'mocha!./specs/4-expanded-object-functionality.spec.js',
    'mocha!./specs/5-destructuring.spec.js',
    'mocha!./specs/6-symbols.spec.js',
    'mocha!./specs/7-setsAndMaps.spec.js',
    'mocha!./specs/8-iterators-generators.spec.js',
    'mocha!./specs/9-classes.spec.js',
    'mocha!./specs/10-improved-array-capabilities.spec.js',
    'mocha!./specs/11-promises.spec.js'
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
    }]
  }
};