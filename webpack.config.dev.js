const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin');

const isDev = process.env.NODE_ENV === 'development';

const devEntries = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true&quiet=true',
];

const entry = [
    ...isDev ? devEntries : [],
    path.resolve(__dirname, 'src/index.js'),
];

const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
        jsExtension: isDev ? '.js' : '.br',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
        },
    }),
];

const prodPlugins = [
    new CompressionPlugin({
        filename: '[path].br',
        algorithm: 'brotliCompress',
        test: /\.jsx?$/,
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: true,
    }),
    new HtmlWebpackChangeAssetsExtensionPlugin(),
];

if (!isDev) plugins.push(...prodPlugins);

module.exports = {
    mode: isDev ? 'development' : 'production',
    target: 'web',
    entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        ...isDev && {
            alias: {
                'react-dom': '@hot-loader/react-dom',
            },
        },
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
