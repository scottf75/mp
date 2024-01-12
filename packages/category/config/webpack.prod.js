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
    publicPath: '/category/latest/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(
        `https://${domainUrl}/category`
      ),
    }),
    new ModuleFederationPlugin({
      name: 'category',
      filename: 'remoteEntry.js',
      exposes: {
        './CategoryApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
