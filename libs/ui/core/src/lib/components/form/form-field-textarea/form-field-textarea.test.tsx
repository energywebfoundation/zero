import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  Standard,
  Filled,
  Outlined,
  Error,
  Password,
  Number,
  StartAdornment,
  EndAdornment,
  BothAdornments,
} from './form-field-textarea.stories';

describe('FormFieldTextarea', () => {
  it('should render default textarea', () => {
    const { baseElement } = render(<Standard {...Standard.args} />);
    expect(baseElement).toBeInTheDocument();
    expect(baseElement.querySelector('.Mui-error')).not.toBeInTheDocument();
  });

  it('should render filled textarea', () => {
    const { baseElement } = render(<Filled {...Filled.args} />);
    expect(
      baseElement.querySelector('.MuiFilledInput-root')
    ).toBeInTheDocument();
  });

  it('should render outlined textarea', () => {
    const { baseElement } = render(<Outlined {...Outlined.args} />);
    expect(
      baseElement.querySelector('.MuiOutlinedInput-root')
    ).toBeInTheDocument();
  });

  it('should render textarea with error state', () => {
    const { baseElement } = render(<Error {...Error.args} />);
    expect(baseElement).toBeInTheDocument();
    expect(baseElement.querySelector('.Mui-error')).toBeInTheDocument();

    const error = baseElement.querySelector('.MuiFormHelperText-root');
    expect(error).toHaveTextContent(Error.args.errorText);
  });
});
