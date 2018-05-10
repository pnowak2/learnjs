var path = require('path');
var glob = require('glob')

module.exports = {
  entry: [
    'mocha!./specs/1.javascript-language/1.introduction.spec.js',
    'mocha!./specs/1.javascript-language/2.javascript-fundamentals.spec.js',
    'mocha!./specs/1.javascript-language/3.code-quality.spec.js',
    'mocha!./specs/1.javascript-language/4.objects-the-basics.spec.js',
    'mocha!./specs/1.javascript-language/5.data-types.spec.js',
    'mocha!./specs/1.javascript-language/6.advanced-working-with-functions.spec.js',
    'mocha!./specs/1.javascript-language/7.objects-classes-inheritance.spec.js',
    'mocha!./specs/1.javascript-language/8.error-handling.spec.js',
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