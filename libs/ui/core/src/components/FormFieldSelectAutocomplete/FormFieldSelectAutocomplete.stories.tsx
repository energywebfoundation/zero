import { Meta } from '@storybook/react';
import {
  FormFieldSelectAutocomplete,
  FormFieldSelectAutocompleteProps,
} from './FormFieldSelectAutocomplete';
import { Controller, useForm } from 'react-hook-form';

export default {
  title: 'Form / SelectAutocomplete',
  component: FormFieldSelectAutocomplete,
  parameters: {
    controls: {
      exclude: ['onChange'],
    },
  },
} as Meta;

export const Default = (
  args: Omit<FormFieldSelectAutocompleteProps<number>, 'onChange'>
) => {
  const { control } = useForm({ defaultValues: { selectAutocomplete: '' } });
  return (
    <Controller
      name={'selectAutocomplete'}
      control={control}
      render={({ field: { onChange } }) => (
        <FormFieldSelectAutocomplete onChange={onChange} {...args} />
      )}
    />
  );
};
Default.args = {
  label: 'Default autocomplete',
  options: [
    { label: 'First option', value: 1 },
    { label: 'Second variant', value: 2 },
    { label: 'Third value', value: 3 },
  ],
  errorExists: false,
  errorText: '',
};

export const MultipleValues = (
  args: Omit<FormFieldSelectAutocompleteProps<number>, 'onChange'>
) => {
  const { control } = useForm({ defaultValues: { selectAutocomplete: '' } });
  return (
    <Controller
      name={'selectAutocomplete'}
      control={control}
      render={({ field: { onChange } }) => (
        <FormFieldSelectAutocomplete onChange={onChange} {...args} />
      )}
    />
  );
};
MultipleValues.args = {
  label: 'Multiple values autocomplete',
  options: [
    { label: 'First option', value: 1 },
    { label: 'Second variant', value: 2 },
    { label: 'Third value', value: 3 },
  ],
  multiple: true,
  errorExists: false,
  errorText: '',
};

export const WithMaxValues = (
  args: Omit<FormFieldSelectAutocompleteProps<number>, 'onChange'>
) => {
  const { control } = useForm({ defaultValues: { selectAutocomplete: '' } });
  return (
    <Controller
      name={'selectAutocomplete'}
      control={control}
      render={({ field: { onChange } }) => (
        <FormFieldSelectAutocomplete onChange={onChange} {...args} />
      )}
    />
  );
};
WithMaxValues.args = {
  label: 'Max values 2 autocomplete NOT WORKING',
  options: [
    { label: 'First option', value: 1 },
    { label: 'Second variant', value: 2 },
    { label: 'Third value', value: 3 },
    { label: 'Fourth value', value: 4 },
  ],
  multiple: true,
  maxValues: 2,
  errorExists: false,
  errorText: '',
};
