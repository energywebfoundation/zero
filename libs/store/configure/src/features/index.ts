import { combineEpics } from 'redux-observable';
import appStateEpics from './appState/appState.epics';
import navigationEpics from './navigation/navigation.epics';

export * from './appState';
export * from './navigation';

export const rootEpic = combineEpics(appStateEpics, navigationEpics);
