import user from '@store/reducers/user';

const createReducer = (injectedReducers = {}) => ({
    user,
    ...injectedReducers,
});

export default createReducer;
