import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import configureStore from '@store/configure';

import styles from '_app.sass';

const Login = lazy(() => import('@components/login'));
const Home = lazy(() => import('@components/home'));

const store = configureStore();

const ToHome = () => <Redirect to="/" />;

const App = () => (
    <>
        <div className={styles.background} />
        <Suspense fallback={null}>
            <Switch>
                <Route path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route component={ToHome} />
            </Switch>
        </Suspense>
    </>
);

const WithRouter = () => (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

export default hot(WithRouter);
