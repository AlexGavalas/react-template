const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin');

const plugins = [
    new HTMLPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
        jsExtension: '.br',
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
    }),
    new CompressionPlugin({
        filename: '[path].br',
        algorithm: 'brotliCompress',
        test: /\.js(x)?$/,
        compressionOptions: { level: 11 },
        minRatio: 0.8,
        deleteOriginalAssets: true
    }),
    new HtmlWebpackChangeAssetsExtensionPlugin(),
    new WorkboxPlugin.GenerateSW({
        runtimeCaching: [
            {
                urlPattern: /\.br$/,
                handler: 'StaleWhileRevalidate',
            },
        ],
    }),
    new WebpackPwaManifest({
        name: 'React Template',
        short_name: 'RT',
        description: 'My awesome react template',
        background_color: '#055',
        theme_color: '#055',
        start_url: '.',
        display: 'standalone',
        icons: [
            {
                src: path.resolve('src/assets/favicon.ico'),
                sizes: [96, 128, 192, 256, 512],
                destination: '/favicons',
            },
            {
                src: path.resolve('src/assets/android-chrome-512x512.png'),
                sizes: [96, 128, 192, 256, 512],
                destination: '/favicons',
            },
        ],
    }),
    new CopyPlugin([
        { 
            from: path.resolve(__dirname, 'src/assets'),
            to: path.resolve(__dirname, 'dist/assets'), 
        },
    ]),
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
