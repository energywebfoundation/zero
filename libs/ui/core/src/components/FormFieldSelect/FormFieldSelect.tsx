import React, { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormFieldSelectAutocomplete } from '../FormFieldSelectAutocomplete';
import { FormFieldSelectRegular } from '../FormFieldSelectRegular';
import { GenericFormFieldConfig } from '../../containers';

export type FormSelectOption = {
  value: string | number;
  label: string;
  subText?: string;
};

export interface FormFieldSelectConfig extends GenericFormFieldConfig {
  options: FormSelectOption[];
  preSelectedOptions?: Array<FormSelectOption['value']>;
  disabledOptions?: Array<FormSelectOption['value']>;
}
export interface FormSelectProps<FormValuesType> {
  field: FormFieldSelectConfig;
  control: Control<FormValuesType>;
  errorExists: boolean;
  errorText: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
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
  disabled,
}) => {
  return (
    <Controller
      name={field.name as any}
      control={control}
      render={({ field: { value, onChange } }) =>
        field.autocomplete ? (
          <FormFieldSelectAutocomplete
            control={control}
            disabled={Boolean(disabled)}
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
            disabled={Boolean(disabled)}
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
