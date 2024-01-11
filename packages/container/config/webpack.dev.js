const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const { Module } = require('webpack');
const packageJson = require('../package.json');
const webpack = require('webpack');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html',
    },
  },

  plugins: [
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
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        auth: 'auth@http://localhost:8082/remoteEntry.js',
        category: 'category@http://localhost:8081/remoteEntry.js',
        account: 'account@http://localhost:8083/remoteEntry.js',
        transaction:
          'transaction@http://localhost:8084/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
