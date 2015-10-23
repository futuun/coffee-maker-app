var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var development = {
  devtool: 'eval',

  entry: {
    javascript: "./src/index.js",
    html: "./src/index.html",
  },

  output: {
    pathinfo: false,
    path: path.resolve(__dirname, 'dist'),
    filename: "app.js",
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [node_modules_dir],
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.html?$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.s(a|c)ss$/,
        loader: 'style!css!sass',
      }
    ]
  },
}

module.exports = development;
