import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { Action } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { RootState } from '../../providers/StoreProvider';
import { navigationStateActions } from './navigationState.slice';

export const setPrimaryNavigation$: Epic = (
  action$,
  state$: StateObservable<RootState>
): Observable<Action> =>
  action$.pipe(
    ofType(navigationStateActions.setPrimaryNavigation.match),
    mapTo({ type: 'TODO' })
  );

const navigationStateEpics = combineEpics(setPrimaryNavigation$);
export default navigationStateEpics;
