var path = require('path');
var webpack = require('webpack');
var {version, vendor} = require( path.join(process.cwd(), 'package.json'))
var fs = require('fs')
var serverDir = path.dirname(fs.realpathSync(__filename))
let load = (module) => [ path.join(process.cwd(), 'app', module) ]

module.exports = {
  devtool: 'source-map',
  entry: {
    vendor: vendor || ["react", "react-dom"],
    app: load('index')
  },
  output: {
    path: path.join(process.cwd(), 'public', 'js'),
    filename: '[name].js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  node: {
    Buffer: false
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: [path.join(process.cwd(), 'app'), path.join(process.cwd(), 'pages')]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.md$/,
      loader: 'raw-loader'
    }]
  }

};
