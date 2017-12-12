const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/App.jsx",
    output: {
        filename: "./public/bundle.js"
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
    plugins: [new UglifyJSPlugin()],
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".jsx", ".json"]
    }
};


