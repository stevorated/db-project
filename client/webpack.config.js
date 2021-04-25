const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const rules = require('./webpack.rules');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.join(__dirname, 'src/index.jsx'),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-animate.css': path.join(__dirname, '..', 'modules', 'Animate'),
    },
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules,
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    host: '0.0.0.0',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
