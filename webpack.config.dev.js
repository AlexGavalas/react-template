import path from 'path';
import webpack from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';

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
];

export default {
    mode: 'development',
    target: 'web',
    entry,
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
