import { PropsWithChildren, ReactElement } from 'react';
import AdapterDayJs from '@material-ui/lab/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@material-ui/lab';
import { Control, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { GenericFormFieldConfig } from '../../../containers';

export enum DateFormatEnum {
  DATE_FORMAT_MDY = 'MMM D, YYYY',
  DATE_FORMAT_DMY = 'DD/MM/YYYY',
  DATE_FORMAT_ISO = 'YYYY/MM/DD',
  DATE_FORMAT_MONTH_AND_YEAR = 'MMM, YYYY',
  DATE_FORMAT_FULL_YEAR = 'YYYY',
  DATE_FORMAT_INCLUDING_TIME = `MMM D, YYYY hh:mm a`,
}

export type FormFieldDatePickerConfig = Omit<GenericFormFieldConfig, 'type'>;

export interface FormFieldDatePickerProps<FormValuesType> {
  field: FormFieldDatePickerConfig;
  datePickerProps?: Omit<
    FormFieldDatePickerProps<string>,
    'value' | 'onChange' | 'renderInput'
  >;
  control: Control<FormValuesType>;
  errorExists: boolean;
  errorText: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled: boolean;
}

export type TFormFieldDatePicker = <FormValuesType>(
  props: PropsWithChildren<FormFieldDatePickerProps<FormValuesType>>
) => ReactElement;

export const FormFieldDatePicker: TFormFieldDatePicker = ({
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
      render={({ field: { value, onChange } }) => (
        <LocalizationProvider dateAdapter={AdapterDayJs}>
          <DatePicker
            disabled={disabled}
            onChange={onChange}
            value={value}
            inputFormat={DateFormatEnum.DATE_FORMAT_DMY}
            renderInput={(props) => (
              <TextField
                {...props}
                fullWidth
                margin="normal"
                error={errorExists ?? false}
                helperText={errorText ?? ''}
                variant={variant ?? 'filled'}
                // should be changed to a proper solution with custom inputs
                InputLabelProps={{
                  shrink: true,
                  style: { marginTop: -30, fontSize: 18, color: '#6a658a' }
                }}
                label={field.label}
                {...field.textFieldProps}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};
