import { useDispatch, useSelector } from 'react-redux';
import {
  notificationStateActions,
  notificationStateSelectors,
} from '@energy-web-zero/store';

export const useNotificationAreaContainerEffects = () => {
  const dispatch = useDispatch();
  return {
    selectors: {
      notificationList: useSelector(notificationStateSelectors.list),
    },
    actions: {
      dismissNotification: (notificationId: string) => {
        dispatch(notificationStateActions.dismissNotification(notificationId));
      },
    },
  };
};
