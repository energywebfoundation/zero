import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Default } from './FormFieldSelectAutocomplete.stories';

describe('SelectAutocomplete', () => {
  it('should render default SelectAutocomplete', () => {
    const { baseElement } = render(<Default control={null as any} {...Default.args} />);
    expect(baseElement).toBeInTheDocument();

    expect(
      baseElement.querySelector('.MuiAutocomplete-input')
    ).toBeInTheDocument();
  });
});
