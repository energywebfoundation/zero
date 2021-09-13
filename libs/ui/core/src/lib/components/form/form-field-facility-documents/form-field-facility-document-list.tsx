import React, { FC, useContext } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormContext } from '../../../providers/generic-form-context-provider/generic-form-context-provider';
import { GenericFormFieldConfig } from '../../../containers/generic-form-container/generic-form-container';
import { FacilityDocumentListContainer } from '../../../containers/facility-document-list-container/facility-document-list-container';

export interface FormFieldFacilityDocumentListProps extends BaseTextFieldProps {
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

export const FormFieldFacilityDocumentList: FC<FormFieldFacilityDocumentListProps> =
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
    const { setValue } = useContext(GenericFormContext)!;
    register(field.name);
    return (
      <FacilityDocumentListContainer
        handleFacilityDocumentListChanged={(facilityDocumentList) => {
          setValue(field.name, facilityDocumentList);
        }}
      />
    );
  };
