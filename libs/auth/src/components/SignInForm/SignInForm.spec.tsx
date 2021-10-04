import { render } from '@testing-library/react';

import { SignInForm } from './SignInForm';

describe('AuthLoginForm', () => {
  it('should render successfully', () => {
    const handleFormSubmitMockFn = jest.fn();

    const { baseElement } = render(
      <SignInForm submitHandler={handleFormSubmitMockFn} />
    );
    expect(baseElement).toBeTruthy();
  });
});
