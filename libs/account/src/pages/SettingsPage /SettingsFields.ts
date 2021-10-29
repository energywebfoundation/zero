import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui-core';

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
    label: 'Change language',
    type: GenericFormFieldType.Select,
    name: 'language',
  },
  {
    label: 'Currency',
    type: GenericFormFieldType.Select,
    name: 'currency',
  },
  {
    label: '',
    type: GenericFormFieldType.ImageUpload,
    name: 'ImageUpload',
    title: 'images.images',
    subtitle: 'forms.SellerAddFacilitiesImagesForm.youCanAddImagesLater',
  },
];
