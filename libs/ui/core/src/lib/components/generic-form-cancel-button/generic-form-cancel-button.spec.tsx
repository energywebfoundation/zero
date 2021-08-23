import { render } from '@testing-library/react';

import GenericFormCancelButton from './generic-form-cancel-button';

describe('GenericFormCancelButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenericFormCancelButton />);
    expect(baseElement).toBeTruthy();
  });
});
