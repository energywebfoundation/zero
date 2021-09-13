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
} from './form-field-green-label-list.stories';

describe('FormFieldImageUpload', () => {
  it('should render default image upload', () => {
    const { baseElement } = render(<Standard {...Standard.args} />);
    expect(baseElement).toBeInTheDocument();
    expect(baseElement.querySelector('.Mui-error')).not.toBeInTheDocument();
  });

  it('should render filled image upload', () => {
    const { baseElement } = render(<Filled {...Filled.args} />);
    expect(
      baseElement.querySelector('.MuiFilledInput-root')
    ).toBeInTheDocument();
  });

  it('should render outlined image upload', () => {
    const { baseElement } = render(<Outlined {...Outlined.args} />);
    expect(
      baseElement.querySelector('.MuiOutlinedInput-root')
    ).toBeInTheDocument();
  });

  it('should render image upload with error state', () => {
    const { baseElement } = render(<Error {...Error.args} />);
    expect(baseElement).toBeInTheDocument();
    expect(baseElement.querySelector('.Mui-error')).toBeInTheDocument();

    const error = baseElement.querySelector('.MuiFormHelperText-root');
    expect(error).toHaveTextContent(Error.args.errorText);
  });
});
