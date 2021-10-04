import styled from '@emotion/styled';
import { NotificationItem } from '../../components/layout';
import { useNotificationAreaContainerEffects } from './NotificationAreaContainer.effects';

const StyledDiv = styled.div`
  position: absolute;
  top: 98px;
  width: 100vw;
`;

export const NotificationAreaContainer = () => {
  // was using redux-observable, now have to either remove or replace w context
  const { selectors, actions } = useNotificationAreaContainerEffects();
  return (
    <StyledDiv className={'notificationAreaBox'}>
      {selectors.notificationList.map((data, index) => (
        <NotificationItem
          handleDismiss={actions.dismissNotification}
          key={index}
          data={data}
        />
      ))}
    </StyledDiv>
  );
};
