import React, { FC, memo, useContext } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import {
  GenericFormContext,
  GenericFormContextData,
  GenericFormFieldConfig,
  GenericMap,
} from '@energyweb/zero-ui-core';

type T = Omit<
  GenericFormFieldConfig,
  'autocomplete' | 'multiple' | 'maxValues'
> &
  BaseTextFieldProps;

export interface FormFieldMapConfig extends T {
  latitudeFieldName?: string;
  longitudeFieldName?: string;
}

export interface FormFieldMapProps extends BaseTextFieldProps {
  field: FormFieldMapConfig;
  register: UseFormRegister<FieldValues>;
  errorExists: boolean;
  errorText: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
}

export const FormFieldMap: FC<FormFieldMapProps> = memo(
  ({
    field: {
      name,
      latitudeFieldName = 'latitude',
      longitudeFieldName = 'longitude',
    },
    register,
    errorExists,
    errorText,
    disabled,
  }) => {
    register(name);

    const { getValues, setValue } = useContext<GenericFormContextData | null>(
      GenericFormContext
    )!;
    const [latitude, longitude] = getValues([
      latitudeFieldName,
      longitudeFieldName,
    ]) as [string, string];
    return (
      <GenericMap
        coordinates={[Number(latitude), Number(longitude)]}
        handleLocationChange={([lat, lng]) => {
          if (lat && lng) {
            setValue(latitudeFieldName, lat);
            setValue(longitudeFieldName, lng);
            setValue(name, [lat, lng]);
          }
        }}
      />
    );
  }
);
