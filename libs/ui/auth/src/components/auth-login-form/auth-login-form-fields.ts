import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui';

export const authLoginFormFields: TGenericFormFieldList = [
  {
    label: 'forms.AuthLoginForm.email',
    type: GenericFormFieldType.TextInput,
    name: 'email',
  },
  {
    label: 'forms.AuthLoginForm.password',
    type: GenericFormFieldType.Password,
    name: 'password',
  },
];
