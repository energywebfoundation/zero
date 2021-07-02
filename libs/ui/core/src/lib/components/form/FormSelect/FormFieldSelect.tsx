import React, { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormFieldSelectAutocomplete } from '../FormFieldSelectAutocomplete';
import { SelectRegular } from '../SelectRegular';
import { GenericFormField } from '../../../containers/GenericForm';

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

export type TFormSelect = <FormValuesType>(
  props: PropsWithChildren<FormSelectProps<FormValuesType>>
) => ReactElement;

export const FormFieldSelect: TFormSelect = ({
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
          <SelectRegular
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
