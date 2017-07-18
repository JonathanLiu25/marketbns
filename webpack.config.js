const LiveReloadPlugin = require("webpack-livereload-plugin");

const config = {
  entry: "./browser/main.jsx",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  context: __dirname,
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", "*"]
  },
  module: {
    rules: [{
      test: /jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader" // config in .babelrc
    }]
  },
  plugins: process.env.NODE_ENV !== "production" ? [new LiveReloadPlugin({ appendScriptTag: true })] : []
};

module.exports = config;
