var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs')

var serverDir = path.dirname(fs.realpathSync(__filename))

let load = (module) => [ __dirname + '/node_modules/webpack-hot-middleware/client', './app/' + module]

console.log(serverDir)

module.exports = {
  devtool: 'eval',
  entry:  {
    vendor: ["react", "react-dom"],
    app: load('index')
  },
  output: {
    path: path.join(serverDir, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  resolveLoader: {
    root: path.join(serverDir, 'node_modules')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(process.cwd(), 'app'), path.join(process.cwd(), 'pages')]
    }, {
      test: /\.(css|scss|sass)$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
        test: /\.md$/,
        loader: 'raw'
    }]
  }
};
