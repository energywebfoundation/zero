import { render } from '@testing-library/react';

import NotificationAreaContainer from './notification-area-container';

describe('NotificationAreaContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationAreaContainer />);
    expect(baseElement).toBeTruthy();
  });
});
