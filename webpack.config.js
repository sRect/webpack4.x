const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hello world',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      template: './index.html'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    compress: true,
    hot: true,
    open: true,
    compress: true,
    host: 'localhost'
  },
  mode: "development"
}