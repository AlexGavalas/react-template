import path from 'path';
import webpack from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';

const entry = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true&quiet=true',
    path.resolve(__dirname, 'src/index.js'),
];

const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HTMLPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
    }),
    // Minimum dev manifest
    new WebpackPwaManifest(),
];

export default {
    mode: 'development',
    target: 'web',
    entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: 'chunk-[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.sass'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ],
            },
            {
                test: /\.(sass|css)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
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
                                require('autoprefixer'),
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
