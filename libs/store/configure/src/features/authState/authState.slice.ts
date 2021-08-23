import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Providers/StoreProvider';
import { UserDto, UserRole } from '@energyweb/zero-ui-api';

interface IAppState {
  isAuthenticated: boolean;
  token: string | null;
  userProfileData: UserDto | null;
}

const initialState: IAppState = {
  isAuthenticated: false,
  token: null,
  userProfileData: null,
};

export const authStateSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserProfileData: (state, action: PayloadAction<UserDto>) => {
      state.userProfileData = action.payload;
    },
  },
});

export const authStateSelectors = {
  isAuthenticated: (state: RootState): boolean =>
    state.authState.isAuthenticated,
  token: (state: RootState) => state.authState.token,
  userProfileData: (state: RootState) => state.authState.userProfileData,
  isUserSeller: (state: RootState) =>
    Boolean(state.authState.userProfileData?.roles.includes(UserRole.seller)),
  isUserBuyer: (state: RootState) =>
    Boolean(state.authState.userProfileData?.roles.includes(UserRole.buyer)),
};
export const authStateActions = {
  ...authStateSlice.actions,
};
