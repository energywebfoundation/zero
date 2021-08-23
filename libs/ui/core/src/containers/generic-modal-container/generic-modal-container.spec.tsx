import { render } from '@testing-library/react';

import GenericModalContainer from './generic-modal-container';

describe('GenericModalContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenericModalContainer />);
    expect(baseElement).toBeTruthy();
  });
});
