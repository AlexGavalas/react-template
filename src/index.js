import React from 'react';
import { render } from 'react-dom';

import App from './app.jsx';

const rootNode = document.getElementById('root');

render(<App />, rootNode);

if (module.hot) {
    
    module.hot.accept('./app.jsx', () => {

        const NewApp = require('./app.jsx').default;
        
        render(<NewApp />, rootNode);
    });
}
