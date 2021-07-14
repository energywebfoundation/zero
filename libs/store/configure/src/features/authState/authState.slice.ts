import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Providers/StoreProvider';
interface IAppState {
  isAuthenticated: boolean;
  token: string | null;
  userProfileData: any;
}

const initialState: IAppState = {
  isAuthenticated: false,
  token: null,
  userProfileData: null,
};

export const authStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserProfileData: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
  },
});

export const authStateSelectors = {
  isAuthenticated: (state: RootState): boolean =>
    state.authState.isAuthenticated,
  token: (state: RootState): string | null => state.authState.token,
};
export const authStateActions = {
  ...authStateSlice.actions,
};
