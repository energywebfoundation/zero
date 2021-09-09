import React from 'react';
import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import {
  FormFieldFileList,
  FormFieldFileListProps,
} from './form-field-file-list';
import { GenericFormFieldType } from '../../../containers/generic-form-container';

export default {
  title: 'Form / FormInput',
  component: FormFieldFileList,
  parameters: {
    controls: {
      exclude: ['register', 'startAdornment', 'endAdornment'],
    },
  },
} as Meta;

export const Standard = (args: Omit<FormFieldFileListProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldFileList register={register} {...args} />;
};
Standard.args = {
  field: {
    type: GenericFormFieldType.FileList,
    name: 'test',
    label: 'Test input',
  },
  errorExists: false,
  errorText: '',
  isDirty: false,
};