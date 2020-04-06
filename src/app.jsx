import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { Switch, withRouter } from 'react-router';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';

import { Login } from './components/login';

import configureStore from './app-store/configure';

import styles from './_app.sass';

const store = configureStore();

const ToHome = () => <Redirect to="/" />;

const App = withRouter(() => (
    <>
        <div className={styles.background} />
        <Switch>
            <Route path="/" component={Login} />
            <Route component={ToHome} />
        </Switch>
    </>
));

const WithRouter = () => (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

export default hot(WithRouter);
