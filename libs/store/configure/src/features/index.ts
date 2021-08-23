import { combineEpics } from 'redux-observable';
import appStateEpics from './appState/appState.epics';
import navigationStateEpics from './navigationState/navigationState.epics';
import authStateEpics from './authState/authState.epics';
import userFileListStateEpics from './userFileListState/userFileListState.epics';

export * from './appState';
export * from './navigationState';
export * from './authState';
export * from './userFileListState';

export const rootEpic = combineEpics(
  navigationStateEpics,
  appStateEpics,
  authStateEpics,
  userFileListStateEpics
);
