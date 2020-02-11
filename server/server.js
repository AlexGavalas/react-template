import path from 'path';
import express from 'express';

const app = express();

app.use((req, res, next) => {
    
    if (req.url.endsWith('.br')) res.setHeader('Content-Encoding', 'br');
    
    next();
});

if (process.env.NODE_ENV === 'development') {

    require('./util/add-dev-middleware').configure(app);
}

app.use(express.static(path.resolve(__dirname, '../dist')));

export default app;
