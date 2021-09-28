import { render } from '@testing-library/react';

import AccountPage from './account-page';

describe('AccountPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountPage />);
    expect(baseElement).toBeTruthy();
  });
});
