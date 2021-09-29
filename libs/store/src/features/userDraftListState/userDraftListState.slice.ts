import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../providers/StoreProvider';
import { DraftDto } from '@energyweb/zero-api-client';

export interface IUserdraftListState {
  draftList: DraftDto[];
}

const initialState: IUserdraftListState = {
  draftList: [],
};

export const userdraftListStateSlice = createSlice({
  name: 'userdraftListState',
  initialState,
  reducers: {
    userDraftListFetched: (state, action: PayloadAction<DraftDto[]>) => {
      state.draftList = action.payload;
    },
  },
});

const state = (s: RootState) => s.userDraftListState;

export const userDraftListStateSelectors = {
  getUserDraftById: createSelector(
    [state, (s: RootState, id: number) => id],
    (state: IUserdraftListState, id: number) =>
      state.draftList.find((el) => el.id === id)
  ),
  list: createSelector([state], (s) => s.draftList),
  faciliTyDraftList: createSelector([state], (s) =>
    s.draftList.filter((el) => (el.draftType = 'facility'))
  ),
};

export const userdraftListStateActions = {
  ...userdraftListStateSlice.actions,
};
