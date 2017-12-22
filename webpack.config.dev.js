var path = require("path");
var webpack = require("webpack");
var fs = require("fs");

var serverDir = path.dirname(fs.realpathSync(__filename));

let load = module => [path.join(process.cwd(), "js", module)];

console.log("configure webpack", serverDir);

module.exports = {
  devtool: "eval",
  entry: {
    vendor: ["react", "react-dom"],
    app: load("app")
  },
  output: {
    path: path.join(serverDir, "js"),
    filename: "[name].js",
    publicPath: "/js/"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        include: [path.join(process.cwd(), "js")]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.md$/,
        loader: "raw-loader"
      }
    ]
  }
};
