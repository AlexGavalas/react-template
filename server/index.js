import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import compilerOptions from '../webpack.config.dev';
import { logInfo } from './util/logger';

const app = express();
const port = 3001;

const compiler = webpack(compilerOptions);

app.use(
    devMiddleware(compiler, {
        publicPath: compilerOptions.output.publicPath,
        logLevel: 'silent',
    })
);

app.use(hotMiddleware(compiler));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(port, () => {
    
    logInfo(`App listening on port ${port}!`);
});
