import { ofType } from 'redux-observable';
import { switchMap, pluck, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { loginAction } from '@store/actions';

const headers = { 'Content-Type': 'application/json' };

const loginEpic$ = (action$) => 
    action$.pipe(
        ofType(loginAction.type),
        switchMap(({ payload }) => 
            ajax.post('login', payload, headers).pipe(
                pluck('response'),
                map(loginAction.success),
            )),
    );

export default [
    loginEpic$,
];
