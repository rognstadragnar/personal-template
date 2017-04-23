const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack")

const siteContent = require('./src/data/');
console.log(siteContent)

const prod = false;
const sassLoader = prod ? ExtractTextPlugin.extract({
          fallback: "style-loader",
          loader: ["css-loader", "postcss-loader", "sass-loader"]
        }) : ["style-loader","css-loader", "postcss-loader", "sass-loader"]


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          },
        }],
      },
      {
        test: /\.(sass|scss)$/,
        loader: sassLoader
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            },
          },
        ],
      },
      {
        test: /\.pug/,
        use: [{
          loader: 'pug-static-loader',
          options: {
            pretty: false,
            locals: siteContent
          }
        }, ]
      },
    ],
  },
  plugins: [
    /*new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),*/
    new HtmlWebpackPlugin({
      template: './src/template/index.pug'
    }),
    new UglifyJSPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss", ".sass", ".pug"],
    alias: {
      Styles: path.resolve(__dirname, 'src/styles/'),
      Scripts: path.resolve(__dirname, 'src/scripts/')
    }
  }
};


//template-html-loader