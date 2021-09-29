import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../providers/StoreProvider';

export interface INotificationState {
  list: Array<NotificationConfig>;
  limit: number;
}
export enum NotificationType {
  Error = 'Error',
  Warning = 'Warning',
  Info = 'Info',
  Success = 'Success',
}
const initialState: INotificationState = {
  list: [],
  limit: 1,
};

export interface NotificationConfig {
  type: NotificationType;
  text: { firstLine: string; secondLine?: string };
  id: string;
  timeout?: number;
}

export const notificationStateSlice = createSlice({
  name: 'notificationState',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationConfig>) => {
      if (state.list.length < state.limit) {
        state.list.push(action.payload);
      } else {
        state.list.pop();
        state.list.push(action.payload);
      }
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
  },
});

const notificationState = (state: RootState) => state.notificationState;
export const notificationStateSelectors = {
  list: createSelector(notificationState, (state: INotificationState) => state.list),
};
export const notificationStateActions = {
  addNotification: (nc: Omit<NotificationConfig, 'id'>) =>
    notificationStateSlice.actions.addNotification({
      id: uuid(),
      text: nc.text,
      type: nc.type,
    }),
  dismissNotification: notificationStateSlice.actions.dismissNotification,
};
