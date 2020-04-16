import path from 'path';
import express from 'express';
import compression from 'compression';

import login from './routes/login';

const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(compression());

app.use((req, res, next) => {
    
    if (isProd && req.url.includes('chunk')) req.url += '.br';

    if (req.url.endsWith('.br')) res.setHeader('Content-Encoding', 'br');
    
    next();
});

if (process.env.NODE_ENV === 'development') {

    require('./util/add-dev-middleware').configure(app);
}

login.register(app);

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/robots.txt', (req, res) => res.sendFile(path.resolve(__dirname, './robots.txt')));

app.use((req, res) => {
    res.redirect('/');
});

export default app;
