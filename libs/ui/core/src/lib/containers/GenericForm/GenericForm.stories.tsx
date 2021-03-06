import React from 'react';
import { Meta } from '@storybook/react';
import { GenericForm } from './GenericForm';
import { GenericFormProps } from './GenericForm.types';
import * as yup from 'yup';

export default {
  title: 'Containers / Generic Form',
  component: GenericForm,
} as Meta;

type DefaultFormValues = {
  username: string;
  password: string;
  url: string;
};

export const Default = (args: GenericFormProps<DefaultFormValues>) => (
  <GenericForm {...args} />
);
Default.args = {
  submitHandler: (values: any) => {
    console.log(values);
  },
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .email('This should be a valid email')
      .required('Email is required field'),
    password: yup.string().min(6, 'Password should be longer than 6 symbols'),
    url: yup.string().url('Should be a valid url').notRequired(),
  }),
  initialValues: {
    username: '',
    password: '',
    url: '',
  },
  formTitle: 'Test form',
  fields: [
    {
      name: 'email',
      label: 'Email test label',
    },
    {
      name: 'password',
      label: 'Test password label',
      type: 'password',
    },
    {
      name: 'url',
      label: 'Non-required test URL',
      type: 'text',
    },
  ],
  buttonText: 'Submit',
};
