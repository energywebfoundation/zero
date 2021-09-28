import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PrimaryNavigationItem,
  SecondaryNavigationItem,
} from '@energyweb/zero-ui';
import { RootState } from '../../Providers/StoreProvider';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface INavgationState {
  primiaryNavigation: PrimaryNavigationItem[];
  secondaryNavigation: SecondaryNavigationItem[];
}

export const initialState: INavgationState = {
  primiaryNavigation: [],
  secondaryNavigation: [],
};

export const navigationStateSlice = createSlice({
  name: 'navigationState',
  initialState,
  reducers: {
    setPrimaryNavigation: (
      state,
      action: PayloadAction<PrimaryNavigationItem[]>
    ) => {
      state.primiaryNavigation = action.payload;
    },
    setSecondaryNavigation: (
      state,
      action: PayloadAction<SecondaryNavigationItem[]>
    ) => {
      state.secondaryNavigation = action.payload;
    },
  },
});

export const navigationStateActions = {
  ...navigationStateSlice.actions,
};

export const navigationStateSelectors = {
  primiaryNavigation: (state: RootState) =>
    state.navigationState.primiaryNavigation.filter((el) => el.isEnabled),
  secondaryNavigation: (state: RootState) =>
    state.navigationState.secondaryNavigation,
};
