var path = require('path');
var glob = require('glob')

module.exports = {
  entry: [
    'mocha!./specs/1.javascript-language/1.introduction.spec.js',
    'mocha!./specs/1.javascript-language/2.javascript-fundamentals.spec.js',
    'mocha!./specs/1.javascript-language/3.code-quality.spec.js',
    'mocha!./specs/1.javascript-language/4.objects-the-basics.spec.js',
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