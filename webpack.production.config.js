var path              = require('path');
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeDir           = path.resolve(__dirname, 'node_modules');

var postcss           = require('postcss-loader');
var autoprefixer      = require('autoprefixer');

var production = {
  devtool: 'sourcemap',

  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    pathinfo: false,
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [nodeDir],
        loader: 'babel',
      },
      {
        test: /\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract("css?importLoaders=2!postcss!sass"),
      }
    ]
  },

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks : false }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV' : JSON.stringify('production')
      }
    }),
  ]
}

module.exports = production;
