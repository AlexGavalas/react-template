const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
<<<<<<< HEAD
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin')
=======
>>>>>>> 606f5963b1828957bc2e2cb2d363c995ced58884

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
<<<<<<< HEAD
=======
    new CompressionPlugin({
        filename: '[path].br',
        algorithm: 'brotliCompress',
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8,
    }),
>>>>>>> 606f5963b1828957bc2e2cb2d363c995ced58884
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
<<<<<<< HEAD
        jsExtension: '.br',
=======
>>>>>>> 606f5963b1828957bc2e2cb2d363c995ced58884
        minify: {
            removeComments: true,
            collapseWhitespace: true,
        },
    }),
<<<<<<< HEAD
    new CompressionPlugin({
        filename: '[path].br',
        algorithm: 'brotliCompress',
        test: /\.jsx?$/,
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8,
    }),
    new HtmlWebpackChangeAssetsExtensionPlugin(),
=======
>>>>>>> 606f5963b1828957bc2e2cb2d363c995ced58884
];

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
    optimization: {
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
    plugins,
};
