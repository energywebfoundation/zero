import styled from '@emotion/styled';
import { NotificationItem } from '../../components/NotificationItem';
import { useNotificationAreaContainerEffects } from './NotificationAreaContainer.effects';

const StyledNotificationAreaContainer = styled.div`
  position: absolute;
  top: 98px;
  width: 100vw;
`;

export const NotificationAreaContainer = () => {
  const { selectors, actions } = useNotificationAreaContainerEffects();
  return (
    <StyledNotificationAreaContainer className={'notificationAreaBox'}>
      {selectors.notificationList.map((data, index) => (
        <NotificationItem
          handleDismiss={actions.dismissNotification}
          key={index}
          data={data}
        />
      ))}
    </StyledNotificationAreaContainer>
  );
};

export default NotificationAreaContainer;
