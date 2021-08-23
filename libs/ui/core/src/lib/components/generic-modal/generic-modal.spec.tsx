import { render } from '@testing-library/react';

import GenericModal from './generic-modal';

describe('GenericModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenericModal />);
    expect(baseElement).toBeTruthy();
  });
});
