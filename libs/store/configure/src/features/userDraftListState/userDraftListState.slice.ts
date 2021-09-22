import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Providers/StoreProvider';
import { FileMetadataDto } from '@energyweb/zero-ui-api';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IUserdraftListState {
  draftList: FileMetadataDto[];
}

const initialState: IUserdraftListState = {
  draftList: [],
};

export const userdraftListStateSlice = createSlice({
  name: 'userdraftListState',
  initialState,
  reducers: {
    userDraftListFetched: (state, action: PayloadAction<any>) => {
      state.draftList = action.payload;
    },
  },
});

const state = (s: RootState) => s.userDraftListState;

export const userdraftListStateSelectors = {
  getFileMetadataById: createSelector(
    [state, (s: RootState, id: string) => id],
    (state: IUserdraftListState, id: string) =>
      state.draftList.find((el) => el.id === id)
  ),
  list: createSelector([state], (s) => s.draftList),
};

export const userdraftListStateActions = {
  ...userdraftListStateSlice.actions,
};
