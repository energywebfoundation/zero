import { combineEpics, Epic, StateObservable } from 'redux-observable';
import { RootState } from '../../Providers/StoreProvider';
import { Action } from '@reduxjs/toolkit';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export const userdraftListFetchedEpic$: Epic = (
  action$,
  state$: StateObservable<RootState>
): Observable<Action> => action$.pipe(mergeMap(() => EMPTY));

const userDraftListStateEpics = combineEpics(userdraftListFetchedEpic$);
export default userDraftListStateEpics;
