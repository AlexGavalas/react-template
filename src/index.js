import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import App from './app';

const ROOT_NODE = document.getElementById('root');

render(<App />, ROOT_NODE);
    
if (module.hot) {

    module.hot.accept('./app', () => {
        
        unmountComponentAtNode(ROOT_NODE);
    
        render(<App />, ROOT_NODE);
    });
}

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    
    window.addEventListener('load', () => {
    
        navigator.serviceWorker.register('/service-worker.js');
    });
}

else if ('serviceWorker' in navigator) {

    navigator.serviceWorker.getRegistrations().then((registrations) => {

        for(const registration of registrations) registration.unregister();
    });
}
