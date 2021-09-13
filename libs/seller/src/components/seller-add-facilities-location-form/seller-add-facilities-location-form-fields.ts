import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui';

export const sellerAddFacilitiesLocationFormFields: TGenericFormFieldList = [
  {
    label: 'forms.SellerAddFacilitiesLocationForm.country',
    type: GenericFormFieldType.TextInput,
    name: 'country',
    required: true,
  },
  {
    label: 'forms.SellerAddFacilitiesLocationForm.region',
    type: GenericFormFieldType.TextInput,
    name: 'region',
  },
  {
    label: 'forms.SellerAddFacilitiesLocationForm.address',
    type: GenericFormFieldType.TextInput,
    name: 'address',
  },
  {
    label: 'forms.SellerAddFacilitiesLocationForm.gridOperator',
    type: GenericFormFieldType.TextInput,
    name: 'gridOperator',
  },
  {
    label: 'forms.SellerAddFacilitiesLocationForm.latitude',
    type: GenericFormFieldType.TextInput,
    name: 'latitude',
  },
  {
    label: 'forms.SellerAddFacilitiesLocationForm.longitude',
    type: GenericFormFieldType.TextInput,
    name: 'longitude',
  },
];
