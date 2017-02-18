var path = require('path');

module.exports = {
  entry: [
    'mocha!./specs/1-thinking-reactively.spec.js',
    'mocha!./specs/2-reacting-with-rxjs.spec.js',
    'mocha!./specs/3-core-operators.spec.js',
    'mocha!./specs/4-its-about-time-you-used-rxjs.spec.js',
    'mocha!./specs/5-applied-reactive-streams.spec.js',
    'mocha!./specs/6-coordinating business processes.spec.js',
    'mocha!./specs/7-error-handling-with-rxjs.spec.js',
    'mocha!./specs/8-heating-up-observables.spec.js',
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