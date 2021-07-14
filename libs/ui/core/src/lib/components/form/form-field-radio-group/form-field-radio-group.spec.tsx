import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Regular } from './form-field-radio-group.stories';

describe('FormRadioGroupField', () => {
  it('should render default form select', () => {
    const { baseElement } = render(<Regular {...Regular.args} />);
    expect(baseElement).toBeInTheDocument();
  });
});
