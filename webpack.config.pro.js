const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// 清理 dist
const files = fs.readdirSync(path.resolve(__dirname, 'dist'));
files.forEach(file => fs.unlinkSync(path.resolve(__dirname, 'dist', file)));

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'front-end/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle_[hash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.(css|less)$/,
        loader: 'ignore-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    antd: 'antd',
    moment: 'moment',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist', 'index.html'),
      template: path.resolve(__dirname, 'front-end', 'index_cdn.html'),
    }),
    new MiniCssExtractPlugin({ filename: 'bundle_[hash:6].css' }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
  },
};
