if ('assign' in window) import(/* webpackChunkName: "caveman-polyfill" */ 'core-js');
else if ('Set' in window) import(/* webpackChunkName: "polyfill" */ 'core-js/es');
