import { render } from '@testing-library/react';

import AuthPage from './auth-page';

describe('AuthPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthPage />);
    expect(baseElement).toBeTruthy();
  });
});
