import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Check, EmailOutlined } from '@material-ui/icons';
import { GenericFormFieldType } from '../../../containers';
import {
  FormFieldTextInput,
  FormFieldTextInputProps,
} from './FormFieldTextInput';

export default {
  title: 'Form / FormInput',
  component: FormFieldTextInput,
  parameters: {
    controls: {
      exclude: ['register', 'startAdornment', 'endAdornment'],
    },
  },
} as Meta;

export const Standard = (args: Omit<FormFieldTextInputProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldTextInput register={register} {...args} />;
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

export const Filled = (args: Omit<FormFieldTextInputProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldTextInput register={register} {...args} />;
};
Filled.args = {
  field: {
    type: GenericFormFieldType.TextInput,
    name: 'test',
    label: 'Test input',
  },
  errorExists: false,
  errorText: '',
  isDirty: false,
  variant: 'filled' as any,
};

export const Outlined = (args: Omit<FormFieldTextInputProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldTextInput register={register} {...args} />;
};
Outlined.args = {
  field: {
    type: GenericFormFieldType.TextInput,
    name: 'test',
    label: 'Test input',
  },
  errorExists: false,
  errorText: '',
  isDirty: false,
  variant: 'outlined' as any,
};

export const Error = (args: Omit<FormFieldTextInputProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldTextInput register={register} {...args} />;
};

Error.args = {
  field: {
    type: GenericFormFieldType.TextInput,
    name: 'test',
    label: 'Test input',
  },
  errorExists: true,
  errorText: 'Test input is a required field',
  isDirty: false,
};

export const Password = (args: Omit<FormFieldTextInputProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldTextInput register={register} {...args} />;
};
Password.args = {
  field: {
    type: GenericFormFieldType.TextInput,
    name: 'test',
    label: 'Password type input',
  },
  errorExists: false,
  type: 'password',
  errorText: '',
  isDirty: false,
};

export const Number = (args: Omit<FormFieldTextInputProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldTextInput register={register} {...args} />;
};
Number.args = {
  field: {
    type: GenericFormFieldType.NumberInput,
    name: 'test',
    label: 'Number type input',
  },
  errorExists: false,
  type: 'number',
  errorText: '',
  isDirty: false,
};

export const StartAdornment = (
  args: Omit<FormFieldTextInputProps, 'register'>
) => {
  const { register } = useForm();
  return <FormFieldTextInput register={register} {...args} />;
};
StartAdornment.args = {
  field: {
    type: GenericFormFieldType.Textarea,
    name: 'test',
    label: 'Input with start adornment',
    startAdornment: <EmailOutlined color="primary" />,
  },
  errorExists: false,
  errorText: '',
  isDirty: false,
};

export const EndAdornment = (
  args: Omit<FormFieldTextInputProps, 'register'>
) => {
  const { register } = useForm();
  return <FormFieldTextInput register={register} {...args} />;
};
EndAdornment.args = {
  field: {
    type: GenericFormFieldType.TextInput,
    name: 'test',
    label: 'Input with end adornment',
    endAdornment: {
      element: <Check color="secondary" />,
    },
  },
  errorExists: false,
  errorText: '',
  isDirty: false,
};

export const BothAdornments = (
  args: Omit<FormFieldTextInputProps, 'register'>
) => {
  const { register } = useForm();
  return <FormFieldTextInput register={register} {...args} />;
};
BothAdornments.args = {
  field: {
    type: GenericFormFieldType.TextInput,
    name: 'test',
    label: 'Input with both adornments',
    startAdornment: <EmailOutlined color="primary" />,
    endAdornment: {
      element: <Check color="secondary" />,
    },
  },
  errorExists: false,
  errorText: '',
  isDirty: false,
};
