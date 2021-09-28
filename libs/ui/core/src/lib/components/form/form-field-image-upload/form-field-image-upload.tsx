import React, { FC, memo, useContext } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormFieldConfig } from '../../../containers';
import ImageUploadContainer from '../../../containers/image-upload-container/image-upload-container';
import { GenericFormContext } from '@energyweb/zero-ui-core';

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
    errorExists,
    errorText,
    isDirty,
    variant,
    disabled,
    ...rest
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
