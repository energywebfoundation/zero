import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import {
  FormFieldImageUpload,
  FormFieldImageUploadProps,
} from './FormFieldImageUpload';
import { GenericFormFieldType } from '../../../containers';

export default {
  title: 'Form / FormInput',
  component: FormFieldImageUpload,
  parameters: {
    controls: {},
  },
} as Meta;

export const Standard = (args: Omit<FormFieldImageUploadProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldImageUpload register={register} {...args} />;
};
Standard.args = {
  field: {
    type: GenericFormFieldType.ImageUpload,
    name: 'test',
    label: 'Test input',
  },
  errorExists: false,
  errorText: '',
  isDirty: false,
};

export const Error = (args: Omit<FormFieldImageUploadProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldImageUpload register={register} {...args} />;
};

Error.args = {
  field: {
    type: GenericFormFieldType.ImageUpload,
    name: 'test',
    label: 'Test input',
  },
  errorExists: true,
  errorText: 'There was an error uploading image',
  isDirty: false,
};

export const Password = (args: Omit<FormFieldImageUploadProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldImageUpload register={register} {...args} />;
};
