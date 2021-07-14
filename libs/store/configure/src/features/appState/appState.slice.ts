import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { UserRole } from '@energyweb/zero-ui-api';
interface IAppState {
  appLanguage: AppLanguageEnum;
  userRoles: UserRole[];
  isAuthenticated: boolean;
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
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<AppLanguageEnum>) => {
      state.appLanguage = action.payload;
    },
  },
});

export const appStateActions = {
  ...appStateSlice.actions,
  navigate: push,
};
