const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
    // automate the entry points with some path discovery?
    entry: {
      page01: './src/page01-entry.js',
      page02: './src/page02-entry.js'
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
                  presets: [
                    'es2015'
                  ],
                  plugins: [
                    ['transform-react-jsx', { pragma: 'h' }]
                  ]
                }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('development')
            }
          }),
        new CompressionPlugin({
            test: /\.js/
				}),
				new webpack.optimize.CommonsChunkPlugin({
					name: "commons",				
					filename: "./public/commons.js",
				
					// chunks: ["pageA", "pageB"],
					// (Only use these entries)
				})
        ],
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".jsx", ".json"]
    }
};