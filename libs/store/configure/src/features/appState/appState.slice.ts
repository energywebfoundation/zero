import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppLanguageEnum } from '@energyweb/zero-ui';
import { push } from 'connected-react-router';
import { UserRoleEnum } from '../../Providers/StoreProvider';
interface IAppState {
  appLanguage: AppLanguageEnum;
  userRoles: UserRoleEnum[];
  isAuthenticated: boolean;
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
