const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = {
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
  plugins: [new LiveReloadPlugin({ appendScriptTag: true })]
};
