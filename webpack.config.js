/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config();

const prod = !!process.env.PROD;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL || ''),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      base: '/',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: prod ? '[name].[hash].css' : '[name].css',
      chunkFilename: prod ? '[id].[hash].css' : '[id].css',
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    port: process.env.PORT,
    contentBase: './dist',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ],
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/')
    },
    extensions: ['.js', '.jsx', '.scss','.tsx', '.ts']
  }
};
