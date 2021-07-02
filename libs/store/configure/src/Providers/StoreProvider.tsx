import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { FC, ReactElement } from 'react';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { rootEpic } from '../features';
import { navigationStateSlice, appStateSlice } from '../features';

export const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware();

export enum UserRoleEnum {
  Buyer = 'Buyer',
  Seller = 'Seller',
}

export const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
    navigationState: navigationStateSlice.reducer,
    routerState: connectRouter(history),
  },
  devTools: true,
  middleware: [epicMiddleware, logger],
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
