import React, { FC } from 'react';
import {
  TextField,
  Autocomplete,
  Chip,
  BaseTextFieldProps,
} from '@material-ui/core';
import { FormSelectOption } from '../form-field-select';
import { useSelectAutocompleteEffects } from './form-field-select-autocomplete.effects';
import { useStyles } from './SelectAutocomplete.styles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Control } from 'react-hook-form';

export interface FormFieldSelectAutocompleteProps<FormValuesType> {
  label: string | null;
  options: FormSelectOption[];
  onChange: (...event: any[]) => void;
  errorExists: boolean;
  errorText: string;
  variant?: 'standard' | 'outlined' | 'filled';
  multiple?: boolean;
  maxValues?: number;
  disabled?: boolean;
  required?: boolean;
  textFieldProps?: BaseTextFieldProps;
  control: Control<FormValuesType>;
}

// const getOptionSelected = (option: { value: any }, value: { value: any }) =>
//   option.value === value.value;

export const FormFieldSelectAutocomplete: FC<
  FormFieldSelectAutocompleteProps<any>
> = ({
  label,
  onChange,
  options,
  multiple,
  errorExists,
  errorText,
  maxValues,
  disabled,
  required,
  variant,
  textFieldProps,
}) => {
  const classes = useStyles();

  const {
    textValue,
    setTextValue,
    singleChangeHandler,
    multipleChangeHandler,
  } = useSelectAutocompleteEffects(onChange, maxValues);

  return (
    <Autocomplete
      fullWidth
      multiple={multiple}
      filterSelectedOptions
      options={options}
      popupIcon={<ChevronRight />}
      className={classes.autocomplete}
      inputValue={textValue}
      getOptionLabel={(option) => option.label}
      onChange={multiple ? multipleChangeHandler : singleChangeHandler}
      // getOptionSelected={getOptionSelected}
      getOptionDisabled={() => Boolean(disabled)}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          label={label}
          onChange={(event) => setTextValue(event.target.value)}
          helperText={errorText}
          inputProps={{ ...params.inputProps }}
          error={errorExists}
          variant={variant ?? 'filled'}
          fullWidth
          {...textFieldProps}
        />
      )}
      renderTags={(value, getTagProps) =>
        // eslint-disable-next-line lodash/prefer-lodash-method
        value.map((option, index) => (
          <Chip
            label={option.label}
            color="primary"
            {...getTagProps({ index })}
          />
        ))
      }
    />
  );
};
