import { FC, memo, useContext } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormContextData, GenericFormFieldConfig } from '../../../containers';
import { GenericFormContext } from '../../../providers';
import { GenericMap } from '../../layout/GenericMap';

type FormFieldConfig = Omit<
  GenericFormFieldConfig,
  'autocomplete' | 'multiple' | 'maxValues'
>;

export interface FormFieldMapConfig extends FormFieldConfig {
  latitudeFieldName?: string;
  longitudeFieldName?: string;
  disabled?: boolean;
}

export interface FormFieldMapProps {
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
