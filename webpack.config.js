const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isPro = process.env.NODE_ENV === 'production';
const filename = isPro ? 'bundle_[hash:6]' : 'bundle';

module.exports = {
  entry: path.resolve(__dirname, 'front-end/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${filename}.js`,
  },
  mode: isPro ? 'production' : 'development',
  devtool: isPro ? 'none' : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist', 'index.html'),
      template: path.resolve(__dirname, 'front-end', 'index.html'),
    }),
    new MiniCssExtractPlugin({ filename: `${filename}.css` }),
  ],
};
