const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const webpack = require('webpack');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8084/',
  },
  devServer: {
    port: 8084,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(
        'http://localhost:3004/transaction'
      ),
    }),
    new webpack.DefinePlugin({
      'process.env.TRANSACTION_ACCOUNTAPI_URL': JSON.stringify(
        'http://localhost:3004/account'
      ),
    }),
    new webpack.DefinePlugin({
      'process.env.TRANSACTION_CATEGORYAPI_URL': JSON.stringify(
        'http://localhost:3004/category'
      ),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'transaction',
      filename: 'remoteEntry.js',
      exposes: {
        './TransactionApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
