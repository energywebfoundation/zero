import React from 'react';
import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldSwitch, FormSwitchProps } from './form-field-switch';

export default {
  title: 'Form / FormFieldSwitch',
  component: FormFieldSwitch,
} as Meta;

export const Regular = (args: Omit<FormSwitchProps<boolean>, 'control'>) => {
  const { control } = useForm({
    defaultValues: { test: 1 },
  });

  return <FormFieldSwitch control={control} {...args} />;
};

Regular.args = {
  disable: false,
  field: {
    name: 'test',
    label: 'Default FormFieldSwitch',
    value: true,
  },
  errorExists: false,
  errorText: '',
};
