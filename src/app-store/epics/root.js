import { combineEpics } from 'redux-observable';

import login$ from '@store/epics/login';

const epics = [
    login$,
].flat();

export default combineEpics(...epics);
