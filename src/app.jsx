import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, withRouter } from 'react-router';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';

import { Login } from './components/login';

import styles from './_app.sass';

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
        <App />
    </BrowserRouter>
);

export default hot(WithRouter);
