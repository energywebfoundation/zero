import {
  BaseTextFieldProps,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import map from 'lodash/fp/map';
import React, { FC } from 'react';
import { FormSelectOption } from '../form-field-select';
import { GenericFormFieldConfig } from '../../../containers/generic-form-container';

interface FormFieldSelectRegular extends GenericFormFieldConfig {
  options: FormSelectOption[];
}

export interface SelectRegularProps {
  field: FormFieldSelectRegular;
  errorExists: boolean;
  errorText: string;
  value: FormSelectOption['value'];
  onChange: (...event: any[]) => void;
  variant?: 'standard' | 'outlined' | 'filled';
  textFieldProps?: BaseTextFieldProps;
}

export const FormFieldSelectRegular: FC<SelectRegularProps> = ({
  field,
  errorExists,
  errorText,
  variant,
  value,
  onChange,
  textFieldProps,
}) => {
  const { options } = field;
  return (
    <TextField
      disabled={field.frozen}
      select
      name={field.name}
      label={field.label}
      type={field.name}
      error={errorExists}
      helperText={errorText}
      fullWidth
      margin="normal"
      variant={variant ?? 'standard'}
      value={value ?? ''}
      defaultValue={value}
      onChange={onChange}
      {...textFieldProps}
    >
      {map(
        ({ label, value, subText }: FormSelectOption) => (
          <MenuItem key={label} value={value}>
            <div>
              <Typography fontSize={'16px'} color={'primary'} fontWeight={600}>
                {label}
              </Typography>
              {subText && (
                <Typography
                  fontWeight={'500'}
                  fontSize={'14px'}
                  color={'primary'}
                >
                  {subText}
                </Typography>
              )}
            </div>
          </MenuItem>
        ),
        options
      )}
    </TextField>
  );
};
