import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { RootState } from '../../Providers/StoreProvider';
import { Action } from '@reduxjs/toolkit';
import { EMPTY, Observable } from 'rxjs';
import { mapTo, mergeMap, tap } from 'rxjs/operators';
import { appStateActions } from './appState.slice';

export const siteLanguageChangedEpic$: Epic = (
  action$,
  state$: StateObservable<RootState>
): Observable<Action> =>
  action$.pipe(
    ofType(appStateActions.changeLanguage),
    tap((value) => {
      console.log('language changed');
    }),
    mergeMap(() => EMPTY)
  );

export const appIsInitializedEpic$: Epic = (action$): Observable<Action> =>
  action$.pipe(
    ofType(appStateActions.setIsInitialized),
    tap(() => {}),
    mapTo(appStateActions.setLoading(false))
  );

const appStateEpics = combineEpics(
  siteLanguageChangedEpic$,
  appIsInitializedEpic$
);
export default appStateEpics;
