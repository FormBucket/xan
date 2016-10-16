var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var {version, vendor} = require( path.join(process.cwd(), 'package.json'))
var fs = require('fs')
var serverDir = path.dirname(fs.realpathSync(__filename))
let load = (module) => [ path.join(process.cwd(), 'app', module) ]

module.exports = {
  entry: {
    vendor: vendor || ["react", "react-dom"],
    app: load('index')
  },
  output: {
    path: path.join(process.cwd(), 'public', 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  resolveLoader: {
    root: path.join(serverDir, 'node_modules')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
   }),
   new ExtractTextPlugin('app.css')
  ],
  node: {
    Buffer: false
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(process.cwd(), 'app'), path.join(process.cwd(), 'pages')]
    }, {
      test: /\.(css|scss|sass)$/,
      loader: ExtractTextPlugin.extract(
        "style",
        "css!sass"
      )
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.md$/,
      loader: 'raw'
    }]
  }
};
