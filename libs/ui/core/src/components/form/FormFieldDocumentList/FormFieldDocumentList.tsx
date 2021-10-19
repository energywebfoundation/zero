import { noop } from 'lodash';
import { FC } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { UseMutateAsyncFunction } from 'react-query';
import { GenericFormFieldConfig } from '../../../containers';
import { UploadFile, UploadFileResponse } from '../../file';
import { FormDocumentList } from '../FormDocumentList';
import { useFormFieldDocumentListEffects } from './FormFieldDocumentList.effects';

export interface FormFieldDocumentListProps {
  field: Omit<
    GenericFormFieldConfig,
    'autocomplete' | 'multiple' | 'maxValues'
  >
  register: UseFormRegister<FieldValues>;
  errorExists: boolean;
  errorText: string;
  isDirty: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
  isLoading?: boolean;
  mutateUpload: UseMutateAsyncFunction<UploadFileResponse, unknown, {
    data: UploadFile;
  }, unknown> | undefined;
}

export const FormFieldDocumentList: FC<FormFieldDocumentListProps> =
  ({ field, register, mutateUpload, isLoading }) => {
    register(field.name);
    const { list, handleDescriptionChanged, handleRemoveDocument, handleFileSelectionSubmit } = useFormFieldDocumentListEffects(field);

    if(!mutateUpload) {
      console.log('mutateUpload funciton is not provided for FormFieldDocumentList');
      return null
    }

    return (
    <FormDocumentList
      handleDescriptionChanged={handleDescriptionChanged}
      handleRemoveDocument={handleRemoveDocument}
      handleFileSelectionSubmit={handleFileSelectionSubmit}
      handleFileListChanged={noop}
      documentList={list}
      isLoading={isLoading}
      mutateUpload={mutateUpload}
      field={field}
    />
    );
  };
