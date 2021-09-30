import { FC, memo, useContext } from 'react';
import { BaseTextFieldProps } from '@material-ui/core';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { GreenLabelListContainer, GenericFormFieldConfig } from '../../containers';
import { GenericFormContext } from '../../providers';

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
  }) => {
    const { getValues, setValue } = useContext(GenericFormContext)!;
    register(field.name);
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
