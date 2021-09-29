import React, { FC, memo, useState } from 'react';
import VisibilityOutlined from '@material-ui/icons/Visibility';
import VisibilityOffOutlined from '@material-ui/icons/VisibilityOffOutlined';
import {
  InputAdornment,
  BaseTextFieldProps,
  TextField,
} from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormFieldConfig } from '../../containers';

export interface FormFieldPasswordProps extends BaseTextFieldProps {
  field: Omit<
    GenericFormFieldConfig,
    'autocomplete' | 'multiple' | 'maxValues'
  > &
    BaseTextFieldProps;
  register: UseFormRegister<FieldValues>;
  errorExists: boolean;
  errorText: string;
  isDirty: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
}

export const FormFieldPassword: FC<FormFieldPasswordProps> = memo(
  ({
    field,
    register,
    errorExists,
    errorText,
    isDirty,
    variant,
    disabled,
    ...rest
  }) => {
    const { ref, name, onBlur, onChange } = register(field.name);
    const [showPassword, setShowPassword] = useState(false);

    return (
      <TextField
        name={name}
        disabled={disabled}
        label={field.label ?? ''}
        type={showPassword ? 'text' : 'password'}
        inputRef={ref}
        error={errorExists ?? false}
        helperText={errorText}
        fullWidth
        margin="normal"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              {!showPassword ? (
                <VisibilityOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <VisibilityOffOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword(false)}
                />
              )}
            </InputAdornment>
          ),
        }}
        onChange={onChange}
        onBlur={onBlur}
        {...field.textFieldProps}
        {...rest}
        variant={'filled'}
      />
    );
  }
);
