const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const webpack = require('webpack');

const domain = process.env.PRODUCTION_DOMAIN;
const domainUrl = 'd18q8tuybdwry.cloudfront.net';

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TRANSACTION_ACCOUNTAPI_URL': JSON.stringify(
        `https://${domainUrl}/account`
      ),
    }),
    new webpack.DefinePlugin({
      'process.env.TRANSACTION_CATEGORYAPI_URL': JSON.stringify(
        `https://${domainUrl}/category`
      ),
    }),
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        category: `category@${domain}/category/latest/remoteEntry.js`,
        account: `account@${domain}/account/latest/remoteEntry.js`,
        transaction: `transaction@${domain}/transaction/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
