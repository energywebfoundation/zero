import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  Standard,
} from './FormFieldPassword.stories';

describe('FormInput', () => {
  it('should render default form input', () => {
    const { baseElement } = render(<Standard {...Standard.args} />);
    expect(baseElement).toBeInTheDocument();
    expect(baseElement.querySelector('.Mui-error')).not.toBeInTheDocument();
  });

});
