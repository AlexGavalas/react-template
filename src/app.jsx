import React from 'react';
import { hot } from 'react-hot-loader/root';

import styles from './_app.sass';

const App = () => (
    <h1 className={styles.main}>HEY REACT 16!</h1>
);

export default hot(App);
