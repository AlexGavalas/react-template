const path = require('path');

const HTMLPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin');
const glob = require('glob');

const plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    }), 
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
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
            {
                urlPattern: /\.(html|json|png|css)$/,
                handler: 'NetworkFirst',
            },
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
        inject: true,
        ios: true,
        icons: [
            {
                src: path.resolve('src/assets/android-chrome-512x512.png'),
                sizes: [72, 96, 128, 144, 192, 384, 512],
                destination: '/favicons',
            },
            {
                src: path.resolve('src/assets/android-chrome-512x512.png'),
                sizes: [120, 152, 167, 180],
                ios: true,
                destination: '/favicons',
            },
        ],
    }),
];

module.exports = {
    mode: 'production',
    target: 'web',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[contenthash].js',
        chunkFilename: 'chunk-[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(sass|css)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('cssnano'),
                                require('autoprefixer'),
                                require('@fullhuman/postcss-purgecss')({
                                    content: glob.sync('src/**/*.{js,jsx}', { nodir: true }),
                                    // Whitelist all html tags
                                    whitelistPatterns: [
                                        /^[^.]/
                                    ],
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins,
};
