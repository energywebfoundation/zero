import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { RootState } from '../../Providers/StoreProvider';
import { Action } from '@reduxjs/toolkit';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { appStateActions } from './appState.slice';

export const siteLanguageChangedEpic$: Epic = (
  action$,
  state$: StateObservable<RootState>
): Observable<Action> =>
  action$.pipe(
    ofType(appStateActions.changeLanguage.match),
    tap((value) => {
      console.log('language changed');
    }),
    mergeMap(() => EMPTY)
  );

const appStateEpics = combineEpics(siteLanguageChangedEpic$);
export default appStateEpics;
