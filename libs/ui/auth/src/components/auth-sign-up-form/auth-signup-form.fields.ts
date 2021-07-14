import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui';
import { UserRole } from '@energyweb/zero-ui-api';

export const authSignupFormFields: TGenericFormFieldList = [
  {
    label: 'forms.AuthSignUpForm.firstName',
    type: GenericFormFieldType.TextInput,
    name: 'firstName',
  },
  {
    label: 'forms.AuthSignUpForm.lastName',
    type: GenericFormFieldType.TextInput,
    name: 'lastName',
  },
  {
    label: 'forms.AuthSignUpForm.email',
    type: GenericFormFieldType.TextInput,
    name: 'email',
  },

  {
    label: 'forms.AuthSignUpForm.password',
    type: GenericFormFieldType.Password,
    name: 'password',
  },
  {
    label: 'forms.AuthSignUpForm.passwordConfirm',
    type: GenericFormFieldType.Password,
    name: 'passwordConfirm',
  },

  {
    label: null,
    type: GenericFormFieldType.RadioGroup,
    name: 'userRole',
    options: [
      {
        label: 'forms.AuthSignUpForm.userRole.options.buyer',
        value: UserRole.buyer,
      },
      {
        label: 'forms.AuthSignUpForm.userRole.options.seller',
        value: UserRole.seller,
      },
    ],
  },
];
