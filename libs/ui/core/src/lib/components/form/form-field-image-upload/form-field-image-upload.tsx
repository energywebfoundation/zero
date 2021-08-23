import React, { FC, forwardRef, memo } from 'react';
import { BaseTextFieldProps, TextareaAutosize } from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormFieldConfig } from '../../../containers';
import ImageUpload from '../../image-upload/image-upload';

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
    const { ref, name, onBlur, onChange } = register(field.name);
    return (
      <ImageUpload ref={ref} name={name} onBlur={onBlur} onChange={onChange} />
    );
  }
);
