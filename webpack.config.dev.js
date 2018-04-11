var path = require("path");
var webpack = require("webpack");
var fs = require("fs");

var serverDir = path.dirname(fs.realpathSync(__filename));

let load = module => [path.join(process.cwd(), "js", module)];

console.log("configure webpack", serverDir);

module.exports = {
  devtool: "eval",
  mode: "development",
  entry: {
    vendor: ["react", "react-dom"],
    app: load("app")
  },
  output: {
    path: path.join(serverDir, "js"),
    filename: "[name].js",
    publicPath: "/js/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: [path.join(process.cwd(), "js")]
      },
      {
        test: /\.json$/,
        use: ["json-loader"]
      },
      {
        test: /\.md$/,
        use: ["raw-loader"]
      }
    ]
  }
};
