// This file is used in development process of the project and there will be another file in case of production

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "../../dist/client"),
    },
    hot: true, //allow reloading
  },
});
