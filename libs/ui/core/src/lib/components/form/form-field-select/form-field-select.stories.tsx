import React from 'react';
import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldSelect, FormSelectProps } from './form-field-select';

export default {
  title: 'Form / FormSelect',
  component: FormFieldSelect,
} as Meta;

export const Regular = (args: Omit<FormSelectProps<string>, 'control'>) => {
  const { control } = useForm({
    defaultValues: { test: 1 },
  });

  return <FormFieldSelect control={control} {...args} />;
};
Regular.args = {
  disable: false,
  field: {
    name: 'test',
    label: 'Default Regular FormSelect',
    options: [
      { value: 1, label: 'First option' },
      { value: 2, label: 'Second option' },
      { value: 3, label: 'Third option' },
    ],
  },
  errorExists: false,
  errorText: '',
};

export const Autocomplete = (
  args: Omit<FormSelectProps<number>, 'control'>
) => {
  const { control } = useForm({
    defaultValues: { test: 1 },
  });

  return <FormFieldSelect control={control} {...args} />;
};
Autocomplete.args = {
  field: {
    name: 'test',
    label: 'Autocomplete FormSelect',
    select: true,
    autocomplete: true,
    options: [
      { value: 1, label: 'First option' },
      { value: 2, label: 'Second option' },
      { value: 3, label: 'Third option' },
    ],
  },
  errorExists: false,
  errorText: '',
};

export const AutocompleteMultipleValues = (
  args: Omit<FormSelectProps<number>, 'control'>
) => {
  const { control } = useForm({
    defaultValues: { test: 1 },
  });

  return <FormFieldSelect control={control} {...args} />;
};
AutocompleteMultipleValues.args = {
  field: {
    name: 'test',
    label: 'Autocomplete FormSelect with multiple values',
    select: true,
    autocomplete: true,
    multiple: true,
    options: [
      { value: 1, label: 'First option' },
      { value: 2, label: 'Second option' },
      { value: 3, label: 'Third option' },
    ],
  },
  errorExists: false,
  errorText: '',
};
