const createAction = (type) => {

    const action = (payload) => ({ type, payload });

    action.type = type;
    action.successType = `${type} [success]`;
    action.failType = `${type} [fail]`;

    action.success = (payload) => ({ payload, type: action.successType });
    action.fail = (payload) => ({ payload, type: action.failType });

    return action;
};

export default createAction;
