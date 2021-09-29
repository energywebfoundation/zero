import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import * as localforage from 'localforage';
import { AnyAction } from '@reduxjs/toolkit';
import { authStateActions } from './authState.slice';
import { RootState } from '../../providers/StoreProvider';
import { appStateActions } from '../appState';

export const afterUserTokenIsSet$: Epic = (
  action$,
  state$: StateObservable<RootState>
): Observable<AnyAction> =>
  action$.pipe(
    ofType(authStateActions.setToken),
    tap(async ({ payload }) => {
      if (payload && !(await localforage.getItem('token'))) {
        localforage.setItem('token', payload);
        console.log('token is persisted');
      }
    }),
    mapTo(appStateActions.setIsInitialized(true))
  );

const authStateEpics = combineEpics(afterUserTokenIsSet$);
export default authStateEpics;
