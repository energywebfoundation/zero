import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const userFileListStateSelectors = {
  getFileMetadataById: (state: RootState, id: string) =>
    state.userFileListState.fileList.find((el) => el.id === id),
};

export const userFileListStateActions = {
  ...userFileListStateSlice.actions,
  navigate: push,
};
