import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Standard } from './form-field-green-label-list.stories';

describe('FormFieldGreenLabelList', () => {
  it('should render', () => {
    const { baseElement } = render(<Standard {...Standard.args} />);
    expect(baseElement).toBeInTheDocument();
    expect(baseElement.querySelector('.Mui-error')).not.toBeInTheDocument();
  });
});
