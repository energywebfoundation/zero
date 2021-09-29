import { render } from '@testing-library/react';

import NotificationAreaContainer from './NotificationAreaContainer';

describe('NotificationAreaContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationAreaContainer />);
    expect(baseElement).toBeTruthy();
  });
});
