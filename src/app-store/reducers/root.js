import user from './user';

const createReducer = (injectedReducers = {}) => ({
    user,
    ...injectedReducers,
});

export default createReducer;
