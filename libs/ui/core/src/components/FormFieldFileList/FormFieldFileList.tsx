import { FC, memo } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { UseFormRegister, FieldValues, useFormContext } from 'react-hook-form';
import { GenericFormFieldConfig } from '../../containers/GenericFormContainer/GenericFormContainer';
import FileListContainer from '../../containers/FileListContainer/FileListContainer';
import { noop } from 'lodash';

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
  ({ field, register, errorExists, errorText, isDirty, variant, disabled }) => {
    register(field.name);
    const { setValue } = useFormContext();
    return (
      <FileListContainer
        open={false}
        handleCancel={noop}
        handleSubmitSelection={(fileIdList) => {
          setValue(field.name, fileIdList);
          console.log(field.name, fileIdList);
        }}
      />
    );
  }
);
