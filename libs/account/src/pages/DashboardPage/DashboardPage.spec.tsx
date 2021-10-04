import { render } from '@testing-library/react';

import {DashboardPage} from './DashboardPage';

describe('DashboardPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardPage />);
    expect(baseElement).toBeTruthy();
  });
});
