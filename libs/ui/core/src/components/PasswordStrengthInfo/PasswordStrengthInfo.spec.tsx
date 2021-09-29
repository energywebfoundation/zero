import { render } from '@testing-library/react';

import PasswordStrengthInfo from './PasswordStrengthInfo';

describe('PasswordStrengthInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordStrengthInfo />);
    expect(baseElement).toBeTruthy();
  });
});
