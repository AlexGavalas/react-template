const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin');

const plugins = [
    new HTMLPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
        jsExtension: '.br',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
        },
    }),
    new CompressionPlugin({
        filename: '[path].br',
        algorithm: 'brotliCompress',
        test: /\.js(x)?$/,
        compressionOptions: { level: 11 },
        minRatio: 0.8,
        deleteOriginalAssets: true,
    }),
    new HtmlWebpackChangeAssetsExtensionPlugin(),
];

module.exports = {
    mode: 'production',
    target: 'web',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins,
};
