import path from 'path';

import express from 'express';
import compression from 'compression';

import login from './routes/login';

const app = express();

app.use(compression());

if (process.env.NODE_ENV === 'development') {

    require('./util/add-dev-middleware').configure(app);
}

else {
    
    app.use((req, res, next) => {
    
        if (req.url.includes('chunk')) req.url += '.br';
    
        if (req.url.endsWith('.br')) res.setHeader('Content-Encoding', 'br');
        
        next();
    });
    
    const staticAssetsDir = path.resolve(__dirname, '../dist');
    
    app.use(express.static(staticAssetsDir));
}

login.register(app);

app.get('/robots.txt', (req, res) => res.sendFile(path.resolve(__dirname, './robots.txt')));

// Redirect unknown routes to root
app.use((req, res) => res.redirect('/'));

export default app;
