import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { FC, ReactElement } from 'react';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { authStateSlice, rootEpic } from '../features';
import { navigationStateSlice, appStateSlice } from '../features';
import { userFileListStateSlice } from '../features/userFileListState';

export const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware();
export const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
    navigationState: navigationStateSlice.reducer,
    router: connectRouter(history),
    authState: authStateSlice.reducer,
    userFileListState: userFileListStateSlice.reducer,
  },
  devTools: true,
  middleware: [epicMiddleware, logger, routerMiddleware(history)],
});

interface StoreProviderProps {
  children: ReactElement;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
