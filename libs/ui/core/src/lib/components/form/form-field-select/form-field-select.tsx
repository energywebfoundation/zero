import React, { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormFieldSelectAutocomplete } from '../form-field-select-autocomplete';
import { FormFieldSelectRegular } from '../form-field-select-regular';
import { GenericFormField } from '../../../containers';

export type FormSelectOption = {
  value: string | number;
  label: string;
};

export interface FormFieldSelect extends GenericFormField {
  options: FormSelectOption[];
}
export interface FormSelectProps<FormValuesType> {
  field: FormFieldSelect;
  control: Control<FormValuesType>;
  errorExists: boolean;
  errorText: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disable: boolean;
}

export type TFormFieldSelect = <FormValuesType>(
  props: PropsWithChildren<FormSelectProps<FormValuesType>>
) => ReactElement;

export const FormFieldSelect: TFormFieldSelect = ({
  field,
  control,
  errorExists,
  errorText,
  variant,
}) => {
  return (
    <Controller
      name={field.name as any}
      control={control}
      render={({ field: { value, onChange } }) =>
        field.autocomplete ? (
          <FormFieldSelectAutocomplete
            label={field.label}
            options={field.options}
            onChange={onChange}
            errorExists={errorExists}
            errorText={errorText}
            multiple={field.multiple}
            maxValues={field.maxValues}
            variant={variant}
            textFieldProps={field.textFieldProps}
          />
        ) : (
          <FormFieldSelectRegular
            field={field}
            errorExists={errorExists}
            errorText={errorText}
            value={value as any}
            onChange={onChange}
            variant={variant}
            textFieldProps={field.textFieldProps}
          />
        )
      }
    />
  );
};
