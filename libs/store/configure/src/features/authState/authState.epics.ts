import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { RootState } from '../../Providers/StoreProvider';
import { Action } from '@reduxjs/toolkit';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { authStateActions } from './authState.slice';

export const userIsAuthenticatedEpic$: Epic = (
  action$,
  state$: StateObservable<RootState>
): Observable<Action> =>
  action$.pipe(
    ofType(authStateActions.setIsAuthenticated.match),
    tap((value) => {
      console.log('user is authenticated');
    }),
    mergeMap(() => EMPTY)
  );

const authStateEpics = combineEpics(userIsAuthenticatedEpic$);
export default authStateEpics;
