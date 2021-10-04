import { FC, useContext } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { GenericFormContext, GenericFormFieldConfig } from '@energyweb/zero-ui-core';
import { FacilityDocumentListContainer } from '../FacilityDocumentListContainer';

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
  ({ field, register }) => {
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
