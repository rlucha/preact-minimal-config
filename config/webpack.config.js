const path = require("path");
const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
// webpack entry builder
// Replace this with ramda
// this replaces the previous webpack config
// automate the entry points with some path discovery?
// entry: {
//   page01: "./src/page01-entry.js",
//   page02: "./src/page02-entry.js"
// },
const siteConfig = require("./site.json")
let entries = {} 
for (k in siteConfig) {
  entries[k] = siteConfig[k]["ssr-entry"]
}

const dev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: entries,
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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    })
		// Make this pick only certain chunks and solve the problem of serving from a particular relative route
    // new ManifestPlugin({ fileName: "push-manifest.json" })
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".json"]
  },
  mode: dev ? 'development' : 'production'
};
