import { filter, mapTo } from 'rxjs/operators';
import { Epic, StateObservable } from 'redux-observable';
import { RootState } from '../../Providers/StoreProvider';

export const appEpic: Epic = (action$, state$: StateObservable<RootState>) =>
  action$.pipe(
    filter((action) => action.type === 'PING'),
    mapTo({ type: 'PONG' })
  );
