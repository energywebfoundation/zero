import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { RootState } from '../../Providers/StoreProvider';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { authStateActions } from './authState.slice';
import * as localforage from 'localforage';
import { AnyAction } from '@reduxjs/toolkit';

export const afterUserTokenIsSet$: Epic = (
  action$,
  state$: StateObservable<RootState>
): Observable<AnyAction> =>
  action$.pipe(
    ofType(authStateActions.setToken),
    tap(async ({ payload }) => {
      console.log(payload);
      if (!(await localforage.getItem('token'))) {
        localforage.setItem('token', payload);
        console.log('token is persisted');
      }
    }),
    mergeMap(() => EMPTY)
  );

const authStateEpics = combineEpics(afterUserTokenIsSet$);
export default authStateEpics;
