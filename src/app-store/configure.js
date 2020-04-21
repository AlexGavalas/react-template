import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import createReducer from '@store/reducers/root';
import rootEpic from '@store/epics/root';

const epicMiddleware = createEpicMiddleware();

const isProd = process.env.NODE_ENV === 'production';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const enableHotReload = (store) => {

    module.hot?.accept('@store/reducers', () => {

        store.replaceReducer(createReducer(store.injectedReducers));
    });
};

const configure = (initialState) => {

    const middlewares = [epicMiddleware];

    const enhancers = [applyMiddleware(...middlewares)];

    const composeEnhancers = !isProd && reduxDevTools ? reduxDevTools({ shouldHotReload: false }) : compose;

    const store = createStore(
        createReducer,
        initialState,
        composeEnhancers(...enhancers),
    );

    epicMiddleware.run(rootEpic);

    store.injectedReducers = {};

    enableHotReload(store);

    return store;
};

export default configure;
