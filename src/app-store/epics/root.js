import { combineEpics } from 'redux-observable';

import login$ from './login';

const epics = [
    login$,
].flat();

export default combineEpics(...epics);
