import React, { FC, forwardRef, memo } from 'react';
import { BaseTextFieldProps, useFormControl } from '@material-ui/core';
import { UseFormRegister, FieldValues, useFormContext } from 'react-hook-form';
import { GenericFormFieldConfig } from '../../../containers/generic-form-container/generic-form-container';
import FileListContainer from '../../../containers/file-list-container/file-list-container';

export interface FormFieldFileListProps extends BaseTextFieldProps {
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

export const FormFieldFileList: FC<FormFieldFileListProps> = memo(
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
    const { setValue } = useFormContext();
    return (
      <FileListContainer
        open={false}
        handleCancel={() => {}}
        handleSubmitSelection={(fileIdList) => {
          setValue(field.name, fileIdList);
          console.log(field.name, fileIdList);
        }}
      />
    );
  }
);
