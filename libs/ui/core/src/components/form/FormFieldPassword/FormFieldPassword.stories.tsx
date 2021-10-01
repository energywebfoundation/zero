import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { GenericFormFieldType } from '../../../containers';
import {
  FormFieldPassword,
  FormFieldPasswordProps,
} from './FormFieldPassword';

export default {
  title: 'Form / FormInput',
  component: FormFieldPassword,
  parameters: {
    controls: {
      exclude: ['register', 'startAdornment', 'endAdornment'],
    },
  },
} as Meta;

export const Standard = (args: Omit<FormFieldPasswordProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldPassword register={register} {...args} />;
};

Standard.args = {
  field: {
    type: GenericFormFieldType.TextInput,
    name: 'test',
    label: 'Test input',
  },
  errorExists: false,
  errorText: '',
  isDirty: false,
};

export const Filled = (args: Omit<FormFieldPasswordProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldPassword register={register} {...args} />;
};