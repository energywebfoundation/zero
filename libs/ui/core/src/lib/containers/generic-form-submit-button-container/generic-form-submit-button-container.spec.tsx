import { render } from '@testing-library/react';

import GenericFormSubmitButtonContainer from './generic-form-submit-button-container';

describe('GenericFormSubmitButtonContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenericFormSubmitButtonContainer />);
    expect(baseElement).toBeTruthy();
  });
});
