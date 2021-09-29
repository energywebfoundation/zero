import { FC, useContext } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormContext } from '../../providers/GenericFormContextProvider/GenericFormContextProvider';
import { GenericFormFieldConfig } from '../../containers/GenericFormContainer/GenericFormContainer';
import { FacilityDocumentListContainer } from '../../containers/FacilityDocumentListContainer/FacilityDocumentListContainer';

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
  ({ field, register, errorExists, errorText, isDirty, variant, disabled }) => {
    register(field.name);
    const { getValues, setValue } = useContext(GenericFormContext)!;

    return (
      <FacilityDocumentListContainer
        data={getValues(field.name)}
        handleFacilityDocumentListChanged={(facilityDocumentList) => {
          setValue(field.name, facilityDocumentList);
        }}
      />
    );
  };
