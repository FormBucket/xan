var webpack = require("webpack");
var webpackConfig = (combinedConfig = require("./webpack.config.dev.js"));

var localWebpackConfig = {};

let combineWebpack = name => {
  try {
    var localWebpackConfig = require(path.join(cwd, name));
    combinedConfig = Object.assign({}, webpackConfig, {
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
  } catch (e) {
    console.log("unable to configure with file: ", name);
    localWebpackConfig = {};
  }
};

combineWebpack(".xanrc");
combineWebpack("webpack.config.js");

if (process.env.NODE_ENV === "development") {
  console.log("DEFAULT WEBPACK CONFIG");
  console.log(webpackConfig);
  console.log("CUSTOM WEBPACK CONFIG");
  console.log(localWebpackConfig);
  console.log("COMBINED WEBPACK CONFIG");
  console.log(JSON.stringify(combinedConfig, null, 4));
}

exports.config = combinedConfig;
exports.webpack = webpack;
exports.compiler = webpack(combinedConfig);
