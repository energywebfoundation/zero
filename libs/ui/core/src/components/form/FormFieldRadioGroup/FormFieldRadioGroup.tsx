import { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { GenericFormFieldConfig } from '../../../containers';

export type FormRadioGroupOption = {
  value: string | number;
  label: string;
};

export interface FormFieldRadioGroupConfig extends GenericFormFieldConfig {
  options: FormRadioGroupOption[];
}
export interface FormRadioGroupProps<FormValuesType> {
  field: FormFieldRadioGroupConfig;
  control: Control<FormValuesType>;
  errorExists: boolean;
  errorText: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disable: boolean;
}

export type TFormFieldRadioGroup = <FormValuesType>(
  props: PropsWithChildren<FormRadioGroupProps<FormValuesType>>
) => ReactElement;

export const FormFieldRadioGroup: TFormFieldRadioGroup = ({
  field,
  control,
  errorExists,
}) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={field.name as any}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <FormControl component="fieldset" error={errorExists}>
            {field.label && (
              <FormLabel component="legend">{field.label}</FormLabel>
            )}
            <RadioGroup
              aria-label={t(field.label ?? '')}
              name="controlled-radio-buttons-group"
              value={value ?? ''}
              onChange={onChange}
            >
              {field.options.map((option) => (
                <FormControlLabel
                  key={option.label}
                  color={'#000'}
                  label={t(option.label)}
                  value={option.value}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      }}
    />
  );
};
