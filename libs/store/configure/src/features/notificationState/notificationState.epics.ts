import { combineEpics } from 'redux-observable';

// export const notificationIsPushed$: Epic = (
//   action$,
//   state
// ): Observable<Action> =>
//   action$.pipe(ofType([notificationStateActions.addNotification]));

const notificationStateEpics = combineEpics();
export default notificationStateEpics;
