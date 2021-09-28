import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { UserRole } from '@energy-web-zero/api-client';
import { RootState } from '../../Providers/StoreProvider';
interface IAppState {
  appLanguage: AppLanguageEnum;
  userRoles: UserRole[];
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

enum AppLanguageEnum {
  English = 'en',
  German = 'de',
  Spanish = 'es',
  Turkish = 'tr',
  Vietnamese = 'vi',
}

const initialState: IAppState = {
  appLanguage: AppLanguageEnum.English,
  userRoles: [],
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<AppLanguageEnum>) => {
      state.appLanguage = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

const appState = (state: RootState) => state.appState;
export const appStateSelectors = {
  isLoading: createSelector(appState, (state: IAppState) => state.isLoading),
  isInitialized: createSelector(
    appState,
    (state: IAppState) => state.isInitialized
  ),
};
export const appStateActions = {
  ...appStateSlice.actions,
  navigate: push,
};
