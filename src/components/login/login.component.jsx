import React from 'react';
import { useDispatch } from 'react-redux';

import { loginAction } from '../../app-store/actions';
import { useStateFromEvent } from '../../util/custom-hooks';

import styles from './login.styles.sass';

const useLogin = () => {
    
    const dispatch = useDispatch();

    return (credentials) => dispatch(loginAction(credentials));
};

const Login = () => {

    const [username, handleUsername] = useStateFromEvent('');
    const [password, handlePassword] = useStateFromEvent('');
    const login = useLogin();

    const handleSubmit = (e) => {

        e.preventDefault();

        login({ username, password });
    };

    return (
        <main className={styles.center}>
            <h2 className={styles.formHeader}>Login</h2>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.formItem}>
                    <label htmlFor="username">Username</label>
                    <input id="username" autoComplete="off" autoFocus={true} onChange={handleUsername} />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" autoComplete="off" onChange={handlePassword} />
                </div>
                <button className={styles.loginButton}>Enter</button>
            </form>
        </main>
    );
};

export default Login;
