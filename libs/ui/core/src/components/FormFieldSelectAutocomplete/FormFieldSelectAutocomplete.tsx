import { FC } from 'react';
import {
  TextField,
  Autocomplete,
  Chip,
  BaseTextFieldProps,
} from '@material-ui/core';
import { Control } from 'react-hook-form';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { FormSelectOption } from '../FormFieldSelect';
import { useSelectAutocompleteEffects } from './FormFieldSelectAutocomplete.effects';

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
      inputValue={textValue}
      getOptionLabel={(option) => option.label}
      onChange={multiple ? multipleChangeHandler : singleChangeHandler}
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
