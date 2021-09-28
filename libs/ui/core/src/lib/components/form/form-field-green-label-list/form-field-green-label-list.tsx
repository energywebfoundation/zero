import React, { FC, memo, useContext } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { GreenLabelListContainer } from '../../../containers/green-label-list-container/green-label-list-container';
import { GenericFormFieldConfig } from '../../../containers/generic-form-container/generic-form-container';
import { GenericFormContext } from '@energyweb/zero-ui-core';

export interface FormFieldGreenLabelListProps extends BaseTextFieldProps {
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

export const FormFieldGreenLabelList: FC<FormFieldGreenLabelListProps> = memo(
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
    const { getValues, setValue } = useContext(GenericFormContext)!;
    return (
      <GreenLabelListContainer
        data={getValues(field.name)}
        handleValueChanged={(data) => {
          console.log('GreenLabelListContainer', data);
          setValue(field.name, data);
        }}
      />
    );
  }
);
