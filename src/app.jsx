import React from 'react';
import { hot } from 'react-hot-loader/root';

import styles from './_app.sass';

const App = () => (
    <>
        <div className={styles.background} />
        <main className={styles.center}>
            <h2 className={styles.formHeader}>Login</h2>
            <form className={styles.loginForm}>
                <div className={styles.formItem}>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" autoComplete="off" />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" autoComplete="off" />
                </div>
            </form>
        </main>
    </>
);

export default hot(App);
