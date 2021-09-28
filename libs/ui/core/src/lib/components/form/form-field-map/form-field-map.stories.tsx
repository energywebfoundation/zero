import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFieldMap, FormFieldMapProps } from './form-field-map';
import { GenericFormFieldType } from '@energyweb/zero-ui-core';

export default {
  title: 'Form / FormFieldFileList',
  component: FormFieldMap,
  parameters: {
    controls: {
      exclude: [],
    },
  },
} as Meta;

export const Standard = (args: Omit<FormFieldMapProps, 'register'>) => {
  const { register } = useForm();
  return <FormFieldMap register={register} {...args} />;
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
