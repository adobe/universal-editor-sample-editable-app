const util = require('util');
const buffer = require('buffer');
const stream = require('stream-browserify');
const webpack = require('webpack');


module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
  ],
  resolve: {
    extensions: [ '.ts', '.js' ],
    fallback: { 
      "util": util,
      "buffer": buffer,
      "stream": stream
    }
  }
};