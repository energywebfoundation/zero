import { FC, memo } from 'react';
import {
  InputAdornment,
  TextField
} from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormFieldConfig } from '../../../containers';

export interface FormFieldTextInputProps {
  field: Omit<
    GenericFormFieldConfig,
    'autocomplete' | 'multiple' | 'maxValues'
  >;
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
        fullWidth
        name={name}
        disabled={disabled}
        label={field.label ?? ''}
        type={field.type ?? 'text'}
        inputRef={ref}
        error={errorExists}
        helperText={errorText ?? ''}
        placeholder={field.placeholderText}
        required={field.required}
        margin="normal"
        // should be changed to a proper solution with custom inputs
        InputLabelProps={{
          shrink: true,
          style: { marginTop: -30, fontSize: 18, color: '#6a658a' }
        }}
        InputProps={{
          disableUnderline: true,
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
        variant={'filled'}
      />
    );
  }
);
