const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/client/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/frontend/js'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
      process: require.resolve('process'),
    },
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'), // Path to your .env file
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
