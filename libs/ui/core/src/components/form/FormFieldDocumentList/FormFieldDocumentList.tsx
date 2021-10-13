import { FC, useContext } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { UseMutateAsyncFunction } from 'react-query';
import { GenericFormFieldConfig } from '../../../containers';
import { GenericFormContext } from '../../../providers';
import { UploadFile, UploadFileResponse } from '../../file';
import { FormFieldDocumentListContainer } from '../FormFieldDocumentListContainer';

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
    const { getValues, setValue } = useContext(GenericFormContext)!;

    if(!mutateUpload) {
      return null
    }

    return (
      <FormFieldDocumentListContainer
        data={getValues(field.name)}
        handleFacilityDocumentListChanged={(facilityDocumentList) => {
          setValue(field.name, facilityDocumentList);
        }}
        mutateUpload={mutateUpload}
        isLoading={isLoading}
      />
    );
  };
