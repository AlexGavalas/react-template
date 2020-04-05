import React from 'react';
import { render } from 'react-dom';

import App from './app';

const ROOT_NODE = document.getElementById('root');

render(<App />, ROOT_NODE);
    
module.hot?.accept('./app', () => {
    
    render(<App />, ROOT_NODE);
});

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    
    window.addEventListener('load', () => {
    
        navigator.serviceWorker.register('/service-worker.js');
    });
}
