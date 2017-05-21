const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');
const autoprefixer      = require('autoprefixer');

const packageConfig     = require('./package.json');
const appEnv            = process.env.NODE_ENV || 'development';
const appPath           = path.join(__dirname, 'app');
const distPath          = path.join(__dirname, 'dist');
const exclude           = /node_modules/;

const config = {

  // The base directory for resolving `entry` (must be absolute path)
  context: appPath,

  entry: {
    app: 'app.js',
    vendor: Object.keys(packageConfig.dependencies)
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // Set proper base URL for serving resources
    publicPath: '/',
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: 'bundle.[hash].js'
  },

  plugins: [

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'app/index.html',
      favicon: 'app/assets/images/favicon.ico'
    }),

    // Do not output to dist if there are errors
    new webpack.NoErrorsPlugin(),

    // Pass environment variable to frontend scipts
    new webpack.DefinePlugin({
      $_ENVIRONMENT: JSON.stringify(appEnv),
      // We must envify CommonJS builds:
      // https://github.com/reactjs/redux/issues/1029
      'process.env.NODE_ENV': JSON.stringify(appEnv)
    }),

    // Generate the bundle file
    new webpack.optimize.CommonsChunkPlugin(
      /* chunkName: */ 'vendor',
      /* filename: */ 'vendor.[hash].js'
    )
  ],

  // Enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: appPath
  },

  module: {
    loaders: [

      // Transpile ES6 and enable Hot Reload
      {
        test: /\.js$/,
        loaders: [
          'babel?cacheDirectory&plugins=babel-plugin-rewire'
        ],
        exclude: exclude
      },

      // CSS
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }

    ],
    // https://github.com/niklasvh/html2canvas/issues/749
    noParse: [/html2canvas/]
  },

  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },

  // Settings for webpack-dev-server
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: appPath,
    colors: true,
    noInfo: true,
    inline: true,
    historyApiFallback: true
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};

if (appEnv === 'development') {
  config.devtool = '#inline-source-map';
}

if (appEnv === 'production') {
  config.plugins.push(
    // Remove build related folders
    new CleanPlugin(['dist'])
  );
}

module.exports = config;