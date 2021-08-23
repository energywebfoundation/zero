import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Regular } from './form-field-switch.stories';

describe('FormRadioGroupField', () => {
  it('should render default form select', () => {
    const { baseElement } = render(<Regular {...Regular.args} />);
    expect(baseElement).toBeInTheDocument();
  });
});
