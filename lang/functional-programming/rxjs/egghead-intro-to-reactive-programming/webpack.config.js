var path = require('path');

module.exports = {
  entry: [
    // 'mocha!./specs/1-what-is-rx.spec.js',
    // 'mocha!./specs/2-event-stream-dbl-clicks.spec.js',
    './src/1-what-is-rx/app.js',
    './src/2-event-stream-dbl-clicks/app.js'
  ],
  output: {
    path: 'builds',
    filename: 'bundle.js'
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