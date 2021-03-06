import React, { FC, memo } from 'react';
import {
  InputAdornment,
  BaseTextFieldProps,
  TextField,
} from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormField } from '../../../containers/GenericForm';

export interface FormFieldTextInputProps extends BaseTextFieldProps {
  field: Omit<
    GenericFormField,
    'options' | 'select' | 'autocomplete' | 'multiple' | 'maxValues'
  > &
    BaseTextFieldProps;
  register: UseFormRegister<FieldValues>;
  errorExists: boolean;
  errorText: string;
  isDirty: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
}

export const FormFieldTextInput: FC<FormFieldTextInputProps> = memo(
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
    const showEndAdornment = field.endAdornment?.isValidCheck
      ? !errorExists && isDirty
      : true;

    return (
      <TextField
        name={name}
        disabled={disabled}
        label={field.label ?? ''}
        type={field.type ?? 'text'}
        inputRef={ref}
        error={errorExists ?? false}
        helperText={errorText ?? ''}
        fullWidth
        margin="normal"
        variant={variant ?? 'standard'}
        InputProps={{
          startAdornment: field.startAdornment && (
            <InputAdornment position="start">
              {field.startAdornment}
            </InputAdornment>
          ),
          endAdornment: field.endAdornment?.element && showEndAdornment && (
            <InputAdornment position="end">
              {field.endAdornment?.element}
            </InputAdornment>
          ),
        }}
        onChange={onChange}
        onBlur={onBlur}
        {...field.textFieldProps}
        {...rest}
      />
    );
  }
);
