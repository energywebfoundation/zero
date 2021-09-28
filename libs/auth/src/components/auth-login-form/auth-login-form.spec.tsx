import { render } from '@testing-library/react';

import AuthLoginForm from './auth-login-form';

describe('AuthLoginForm', () => {
  it('should render successfully', () => {
    const handleFormSubmitMockFn = jest.fn();

    const { baseElement } = render(
      <AuthLoginForm sumbitHandler={handleFormSubmitMockFn} />
    );
    expect(baseElement).toBeTruthy();
  });
});
