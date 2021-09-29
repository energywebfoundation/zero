import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../providers/StoreProvider';

export enum IconTypeEnum {
  PersonAddAlt1Outlined = 'PersonAddAlt1Outlined',
  ShoppingCartOutlined = 'ShoppingCartOutlined',
  SearchOutlined = 'SearchOutlined',
  ListOutlined = 'ListOutlined',
  FlashOn = 'FlashOn',
  PeopleOutlineOutlined = 'PeopleOutlineOutlined',
  VerifiedUserOutlined = 'VerifiedUserOutlined',
}

export interface PrimaryNavigationItem {
  isEnabled: boolean;
  url: string;
  text?: string;
  iconType: IconTypeEnum;
  translateKey?: string;
  prority?: number;
  align: 'left' | 'right';
}

export interface SecondaryNavigationItem {
  url: string;
  text?: string;
  translateKey?: string;
}

export interface INavigationState {
  primiaryNavigation: PrimaryNavigationItem[];
  secondaryNavigation: SecondaryNavigationItem[];
}

export const initialState: INavigationState = {
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
