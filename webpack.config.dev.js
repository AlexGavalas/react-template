const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'web',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true&quiet=true',
        path.resolve(__dirname, 'src/index.js'),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HTMLPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
        }),
    ],
};
