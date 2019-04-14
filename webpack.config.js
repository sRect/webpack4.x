const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  entry: ['./src/index.js', './src/a.js'], // 将两个文件打包成一个
  // entry: { // 多入口
  //   index: './src/index.js',
  //   a: './src/a.js'
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:20].js' // 多出口
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'] // 从右往左
        use: ExtractTextWebpackPlugin.extract({
          use: [
            { loader: 'css-loader' }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'hello world',
      hash: true,
      minify: {
        collapseWhitespace: true, // 折叠空行
        removeAttributeQuotes: true
      },
      template: './index.html',
      // chunks: ['index', 'a'] // index.html 引入index.js
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'a.html',
    //   title: 'hello world',
    //   hash: true,
    //   minify: {
    //     collapseWhitespace: true, // 折叠空行
    //     removeAttributeQuotes: true
    //   },
    //   template: './index.html',
    //   chunks: ['a'] // a.html引入a.js
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextWebpackPlugin({
      filename: 'css/index.css'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    compress: true,
    hot: true,
    open: true,
    host: 'localhost'
  },
  mode: "development"
}