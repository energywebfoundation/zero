import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { RootState } from '../../Providers/StoreProvider';
import { FileMetadataDto } from '@energyweb/zero-ui-api';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IUserFileListState {
  fileList: FileMetadataDto[];
}

const initialState: IUserFileListState = {
  fileList: [],
};

export const userFileListStateSlice = createSlice({
  name: 'userFileListState',
  initialState,
  reducers: {
    userFileListFetched: (state, action: PayloadAction<any>) => {
      state.fileList = action.payload;
    },
  },
});

const state = (s: RootState) => s.userFileListState;

export const userFileListStateSelectors = {
  getFileMetadataById: createSelector(
    [state, (s: RootState, id: string) => id],
    (state: IUserFileListState, id: string) =>
      state.fileList.find((el) => el.id === id)
  ),
  list: createSelector([state], (s) => s.fileList),
};

export const userFileListStateActions = {
  ...userFileListStateSlice.actions,
  navigate: push,
};
