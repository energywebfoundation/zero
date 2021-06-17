import { combineEpics } from 'redux-observable';
import { appEpic } from './app/App.effects';

export const rootEpic = combineEpics(appEpic);
