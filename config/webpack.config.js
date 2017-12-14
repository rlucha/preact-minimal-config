const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  // automate the entry points with some path discovery?
  entry: {
    page01: "./src/page01-entry.js",
    page02: "./src/page02-entry.js"
  },
  output: {
    filename: "./public/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        loader: "babel-loader",
        options: {
          presets: ["es2015"],
          plugins: [["transform-react-jsx", { pragma: "h" }]]
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new CompressionPlugin({
      test: /\.js/
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "./public/commons.js"
		}),
		// Make this pick only certain chunks and solve the problem of serving from a particular relative route
    // new ManifestPlugin({ fileName: "push-manifest.json" })
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".json"]
  }
};
