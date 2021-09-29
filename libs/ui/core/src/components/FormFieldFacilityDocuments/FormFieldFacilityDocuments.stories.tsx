import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import {
  FormFieldFacilityDocumentList,
  FormFieldFacilityDocumentListProps,
} from './FormFieldFacilityDocuments';
import { GenericFormFieldType } from '../../containers/GenericFormContainer';

export default {
  title: 'Form / FormInput',
  component: FormFieldFacilityDocumentList,
  parameters: {
    controls: {},
  },
} as Meta;

export const Standard = (
  args: Omit<FormFieldFacilityDocumentListProps, 'register'>
) => {
  const { register } = useForm();
  return <FormFieldFacilityDocumentList register={register} {...args} />;
};
Standard.args = {
  field: {
    type: GenericFormFieldType.TextInput,
    name: 'test',
    label: null,
  },
  errorExists: false,
  errorText: '',
  isDirty: false,
};
