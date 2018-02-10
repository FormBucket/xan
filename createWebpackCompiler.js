// create the webpack, compiler and config objects.
var cwd = process.cwd();
var path = require('path');
var webpack = require("webpack");

let combineWebpack = (env, name) => {
  try {

   console.log('cwd', cwd, env, name, path.join(cwd, name))
    var webpackConfig = require("./webpack.config." +
      env +
      ".js");

    var localWebpackConfig = require(path.join(cwd, name));

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
