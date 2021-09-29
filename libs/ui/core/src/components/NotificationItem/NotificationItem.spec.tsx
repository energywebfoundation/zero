import { NotificationType } from '@energyweb/zero-ui-store';
import { render } from '@testing-library/react';

import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
    <NotificationItem
      data={{
        type: NotificationType.Success,
        text: { firstLine: '1', secondLine: '2' },
        id: '12',
        timeout: 1000,
      }}
      handleDismiss={() => console.log('dismiss')}
    />
    );
    expect(baseElement).toBeTruthy();
  });
});
