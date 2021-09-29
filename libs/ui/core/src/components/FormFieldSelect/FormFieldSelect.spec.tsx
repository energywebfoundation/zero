import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Regular } from './FormFieldSelect.stories';

describe('FormSelectField', () => {
  it('should render default form select', () => {
    const { baseElement } = render(<Regular {...Regular.args} />);
    expect(baseElement).toBeInTheDocument();
    expect(
      baseElement.querySelector('.MuiSelect-nativeInput')
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(Regular.args.field.options[0].value)
    ).toBeInTheDocument();
  });
});
