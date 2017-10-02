var path = require('path');

module.exports = {
  entry: [
    'mocha!./specs/1-thinking-reactively.spec.js',
    'mocha!./specs/2-reacting-with-rxjs.spec.js',
    'mocha!./specs/3-core-operators.spec.js',
    'mocha!./specs/4-its-time-to-use-rxjs.spec.js',
    'mocha!./specs/5-applied-reactive-streams.spec.js'
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