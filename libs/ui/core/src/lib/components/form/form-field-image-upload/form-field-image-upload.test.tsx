import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Standard } from './form-field-image-upload.stories';

describe('FormFieldImageUpload', () => {
  it('should render default image upload', () => {
    const { baseElement } = render(<Standard {...Standard.args} />);
    expect(baseElement).toBeInTheDocument();
    expect(baseElement.querySelector('.Mui-error')).not.toBeInTheDocument();
  });
});
