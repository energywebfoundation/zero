import { render } from '@testing-library/react';

import NotificationItem from './notification-item';

describe('NotificationItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationItem />);
    expect(baseElement).toBeTruthy();
  });
});
