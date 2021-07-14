import React from 'react';
import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import {
  FormFieldRadioGroup,
  FormRadioGroupProps,
} from './form-field-radio-group';

export default {
  title: 'Form / FormFieldRadioGroup',
  component: FormFieldRadioGroup,
} as Meta;

export const Regular = (args: Omit<FormRadioGroupProps<string>, 'control'>) => {
  const { control } = useForm({
    defaultValues: { test: 1 },
  });

  return <FormFieldRadioGroup control={control} {...args} />;
};
Regular.args = {
  disable: false,
  field: {
    name: 'test',
    label: 'Default FormFieldRadioGroup',
    options: [
      { value: 1, label: 'First option' },
      { value: 2, label: 'Second option' },
      { value: 3, label: 'Third option' },
    ],
  },
  errorExists: false,
  errorText: '',
};
