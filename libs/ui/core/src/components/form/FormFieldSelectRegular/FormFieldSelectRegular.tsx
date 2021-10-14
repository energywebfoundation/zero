import {
  BaseTextFieldProps,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import map from 'lodash/fp/map';
import { FC } from 'react';
import { FormSelectOption } from '../FormFieldSelect';
import { GenericFormFieldConfig } from '../../../containers';

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
  alreadySelectedValues?: Array<FormSelectOption['value']>;
  disabled?: boolean;
}

export const FormFieldSelectRegular: FC<SelectRegularProps> = ({
  field,
  errorExists,
  errorText,
  variant,
  value,
  onChange,
  textFieldProps,
  alreadySelectedValues = [],
  disabled,
}) => {
  const { options } = field;
  return (
    <TextField
      placeholder={field.placeholderText}
      disabled={disabled || field.frozen}
      select
      name={field.name}
      label={field.label}
      type={field.name}
      error={errorExists}
      helperText={errorText}
      fullWidth
      margin="normal"
      variant={variant ?? 'filled'}
      value={value ?? ''}
      defaultValue={value}
      onChange={onChange}
      required={field.required}
      // should be changed to a proper solution with custom inputs
      InputLabelProps={{
        shrink: true,
        style: { marginTop: -30, fontSize: 18, color: '#6a658a' }
      }}
      {...textFieldProps}
    >
      {map(
        ({ label, value, subText }: FormSelectOption) => (
          <MenuItem
            disabled={alreadySelectedValues?.includes(value)}
            key={label}
            value={value}
          >
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
