
export const useNotificationAreaContainerEffects = () => {
  return {
    selectors: {
      notificationList: []
    },
    actions: {
      dismissNotification: (notificationId: string) => {
        console.log(notificationId)
      },
    },
  };
};
