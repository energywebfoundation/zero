import React from 'react';
import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import {
  FormFieldGreenLabelList,
  FormFieldGreenLabelListProps,
} from './FormFieldGreenLabelList';
import { GenericFormFieldType } from '../../../containers/generic-form-container';

export default {
  title: 'Form / FormInput',
  component: FormFieldGreenLabelList,
  parameters: {
    controls: {
      exclude: ['register', 'startAdornment', 'endAdornment'],
    },
  },
} as Meta;

export const Standard = (
  args: Omit<FormFieldGreenLabelListProps, 'register'>
) => {
  const { register } = useForm();
  return <FormFieldGreenLabelList register={register} {...args} />;
};
Standard.args = {
  field: {
    type: GenericFormFieldType.GreenLabelList,
    name: 'test',
    label: 'Test input',
  },
  errorExists: false,
  errorText: '',
  isDirty: false,
};
