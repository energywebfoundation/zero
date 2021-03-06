import React, { FC } from 'react';
import {
  TextField,
  Autocomplete,
  Chip,
  BaseTextFieldProps,
} from '@material-ui/core';
import { FormSelectOption } from '../FormSelect';
import { useSelectAutocompleteEffects } from './SelectAutocomplete.effects';
import { useStyles } from './SelectAutocomplete.styles';

export interface SelectAutocompleteProps<ValueType> {
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
}

// const getOptionSelected = (option: { value: any }, value: { value: any }) =>
//   option.value === value.value;

export const FormFieldSelectAutocomplete: FC<SelectAutocompleteProps<any>> = ({
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
      multiple={multiple}
      filterSelectedOptions
      options={options}
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
