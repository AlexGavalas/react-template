const path = require('path');

const HTMLPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const glob = require('glob');

const findAssets = (assetTags, query) => assetTags.headTags.filter(({ attributes: { src = '' } }) => src.startsWith(`/${query}`));

const plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
    }),
    new HTMLPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html'),
        templateParameters: (compilation, assets, assetTags, options) => {
            // Preload css
            assetTags.headTags
                .filter(({ attributes: { href = '' } }) => href.endsWith('.css'))
                .forEach(({ attributes }) => {
                    attributes.rel = 'preload stylesheet';
                    attributes.as = 'style';
                });

            // Preload js
            assetTags.headTags
                .filter(({ attributes: { src = '' } }) => src.endsWith('.js'))
                .forEach(({ attributes }) => {
                    attributes.rel = 'preload';
                    attributes.as = 'script';
                });

            // Because we compress the module bundle we need to change its filename
            // to include the extension
            const [moduleItem] = findAssets(assetTags, 'main');

            moduleItem.attributes.src += '.br';

            assets.js = assets.js.map((item) => item.startsWith('/main') ? `${item}.br` : item);

            return {
                compilation,
                webpackConfig: compilation.options,
                htmlWebpackPlugin: {
                    tags: assetTags,
                    files: assets,
                    options,
                },
            };
        },
        favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
        scriptLoading: 'defer',
        minify: {
            removeComments: true,
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
    new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        inlineWorkboxRuntime: true,
        runtimeCaching: [
            {
                urlPattern: /\.(json|png|css)$/,
                handler: 'NetworkFirst',
            },
            {
                urlPattern: /\.(br|js)$/,
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
    entry: {
        main: [
            path.resolve(__dirname, 'src/index.js'),
        ],
    },
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
                use: [
                    'babel-loader',
                ],
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
                                        /^[^.]/,
                                    ],
                                }),
                            ],
                        },
                    },
                    'sass-loader',
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
