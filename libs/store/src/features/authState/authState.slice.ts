import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDto, UserRole } from '@energyweb/zero-api-client';
import { RootState } from '../../providers/StoreProvider';

export interface IAuthState {
  isAuthenticated: boolean;
  token: string | null;
  userProfileData: UserDto | null;
}

const initialState: IAuthState = {
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

const authState = (state: RootState) => state.authState;

export const authStateSelectors = {
  isAuthenticated: createSelector(
    authState,
    (state: IAuthState): boolean => state.isAuthenticated
  ),
  token: createSelector(authState, (state: IAuthState) => state.token),
  userProfileData: createSelector(
    authState,
    (state: IAuthState) => state.userProfileData
  ),
  authenticatedUserId: createSelector(
    authState,
    (state: IAuthState) => state.userProfileData?.id
  ),
  isUserSeller: createSelector(authState, (state: IAuthState) =>
    Boolean(state.userProfileData?.roles.includes(UserRole.seller))
  ),
  isUserBuyer: createSelector(authState, (state: IAuthState) =>
    Boolean(state.userProfileData?.roles.includes(UserRole.buyer))
  ),
};
export const authStateActions = {
  ...authStateSlice.actions,
};
