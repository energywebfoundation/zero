import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Regular } from './FormFieldRadioGroup.stories';

describe('FormRadioGroupField', () => {
  it('should render default form select', () => {
    const { baseElement } = render(<Regular {...Regular.args} />);
    expect(baseElement).toBeInTheDocument();
  });
});
