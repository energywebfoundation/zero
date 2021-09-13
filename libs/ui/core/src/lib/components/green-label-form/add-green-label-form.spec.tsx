import { render } from '@testing-library/react';

import GreenLabelForm from './green-label-form';

describe('AddGreenLabelForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GreenLabelForm />);
    expect(baseElement).toBeTruthy();
  });
});
