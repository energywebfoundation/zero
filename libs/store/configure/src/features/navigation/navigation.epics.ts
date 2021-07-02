import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { RootState } from '../../Providers/StoreProvider';
import { Action } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { navigationStateActions } from './navigation.slice';

export const setPrimaryNavigation$: Epic = (
  action$,
  state$: StateObservable<RootState>
): Observable<Action> =>
  action$.pipe(
    ofType(navigationStateActions.setPrimaryNavigation.match),
    mapTo({ type: 'TODO' })
  );

const navigationEpics = combineEpics(setPrimaryNavigation$);
export default navigationEpics;
