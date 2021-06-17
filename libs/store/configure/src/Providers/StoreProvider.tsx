import { configureStore, createReducer } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { FC, ReactElement } from 'react';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    appState: createReducer({}, {}),
    routerState: connectRouter(history),
  },

  middleware: [logger, epicMiddleware],
});

interface StoreProviderProps {
  children: ReactElement;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

// epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
