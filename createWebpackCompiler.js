// create the webpack, compiler and config objects.
var cwd = process.cwd();
var path = require("path");
var webpack = require("webpack");

let combineWebpack = name => {
  try {
    var webpackConfig = require("./webpack.config." +
      (process.env.NODE_ENV || "dev") +
      ".js");

    var localWebpackConfig = { module: { loaders: [] } };
    try {
      localWebpackConfig = require(path.join(cwd, name));
    } catch (e) {}

    var combinedConfig = Object.assign({}, webpackConfig, {
      devtool: localWebpackConfig.devtool || webpackConfig.devtool,
      entry: Object.assign({}, webpackConfig.entry, localWebpackConfig.entry),
      output: Object.assign(
        {},
        webpackConfig.output,
        localWebpackConfig.output
      ),
      // plugins: webpackConfig.plugins.concat(localWebpackConfig.plugins),
      module: {
        loaders: webpackConfig.module.loaders.concat(
          localWebpackConfig.module.loaders
        )
      }
    });

    console.log("cwd", combinedConfig);
    return {
      config: combinedConfig,
      compiler: webpack(combinedConfig)
    };
  } catch (e) {
    console.log("unable to configure with file: ", name, e);
    localWebpackConfig = {};
  }
};

exports.webpack = webpack;
exports.create = combineWebpack;
