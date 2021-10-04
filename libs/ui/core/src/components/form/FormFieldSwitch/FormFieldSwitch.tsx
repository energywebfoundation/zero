import { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlLabel, Switch } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { GenericFormFieldConfig } from '../../../containers';
import { Info } from '../../layout';

export type FormFieldSwitch = GenericFormFieldConfig;

export interface FormSwitchProps<FormValuesType> {
  field: FormFieldSwitch;
  control: Control<FormValuesType>;
  errorExists: boolean;
  errorText: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disable: boolean;
  infoTooltip?: string;
}

export type TFormFieldSwitch = <FormValuesType>(
  props: PropsWithChildren<FormSwitchProps<FormValuesType>>
) => ReactElement;

export const FormFieldSwitch: TFormFieldSwitch = ({
  field,
  control,
}) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={field.name as any}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Info popoverContent={field.infoTooltip || null}>
            <FormControlLabel
              labelPlacement="end"
              label={field.label}
              control={
                <Switch
                  checked={Boolean(value)}
                  disabled={field.frozen}
                  aria-label={t(field.label ?? '')}
                  name="controlled-switch"
                  onChange={onChange}
                />
              }
            />
          </Info>
        );
      }}
    />
  );
};
