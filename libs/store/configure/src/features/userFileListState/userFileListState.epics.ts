import { combineEpics, Epic, StateObservable } from 'redux-observable';
import { RootState } from '../../Providers/StoreProvider';
import { Action } from '@reduxjs/toolkit';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export const userFileListFetchedEpic$: Epic = (
  action$,
  state$: StateObservable<RootState>
): Observable<Action> => action$.pipe(mergeMap(() => EMPTY));

const userFileListStateEpics = combineEpics(userFileListFetchedEpic$);
export default userFileListStateEpics;
