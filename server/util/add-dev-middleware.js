import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import compilerOptions from '../../webpack.config.dev';

const compiler = webpack(compilerOptions);

export const configure = (app) => {

    app.use(
        devMiddleware(compiler, {
            publicPath: compilerOptions.output.publicPath,
            logLevel: 'error',
        })
    );
    
    app.use(hotMiddleware(compiler));
};
