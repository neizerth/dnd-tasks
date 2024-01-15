const {merge} = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require('./webpack.config.common');

const config = {
    plugins: [
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    }
};

module.exports = merge(common, config);