import { combineEpics } from 'redux-observable';
import appStateEpics from './appState/appState.epics';
import navigationStateEpics from './navigationState/navigationState.epics';
import authStateEpics from './authState/authState.epics';

export * from './appState';
export * from './navigationState';
export * from './authState';

export const rootEpic = combineEpics(
  appStateEpics,
  navigationStateEpics,
  authStateEpics
);
