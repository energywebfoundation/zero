import { FC, memo, useContext } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormFieldConfig } from '../../../containers';
import { GenericFormContext } from '../../../providers';
import { ImageUploadContainer } from '../../image';

export interface FormFieldImageUploadProps extends BaseTextFieldProps {
  field: Omit<
    GenericFormFieldConfig,
    'autocomplete' | 'multiple' | 'maxValues'
  > &
    BaseTextFieldProps;
  register: UseFormRegister<FieldValues>;
  errorExists: boolean;
  errorText: string;
  isDirty: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
}

export const FormFieldImageUpload: FC<FormFieldImageUploadProps> = memo(
  ({
    field,
    register,
  }) => {
    register(field.name);
    const { setValue, getValues } = useContext(GenericFormContext)!;
    const imageLIst: string[] = getValues(field.name);
    return (
      <ImageUploadContainer
        disabled={true}
        helpBoxText={field.helpBoxText}
        handleUploadSuccess={(uploaded) => {
          setValue(field.name, [...imageLIst, ...uploaded]);
        }}
      />
    );
  }
);
