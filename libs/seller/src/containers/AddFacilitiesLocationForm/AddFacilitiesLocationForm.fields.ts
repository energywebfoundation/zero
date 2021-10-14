import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui-core';

export interface IAddFacilitiesLocationFormFields {
  country: string;
  region: string;
  gridOperator: string;
  address: string;
  latitude: string;
  longitude: string;
}

export const addFacilitiesLocationFormFields: TGenericFormFieldList = [
  {
    label: 'forms.SellerAddFacilitiesLocationForm.country',
    type: GenericFormFieldType.TextInput,
    name: 'country',
    required: true,
    placeholderText: 'Country'
  },
  {
    label: 'forms.SellerAddFacilitiesLocationForm.region',
    type: GenericFormFieldType.TextInput,
    name: 'region',
    placeholderText: 'Region / Province'
  },
  {
    label: 'forms.SellerAddFacilitiesLocationForm.address',
    type: GenericFormFieldType.TextInput,
    name: 'address',
    placeholderText: 'Address'
  },
  {
    label: 'forms.SellerAddFacilitiesLocationForm.gridOperator',
    type: GenericFormFieldType.TextInput,
    name: 'gridOperator',
    placeholderText: 'Grid operator'
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
  {
    label: '',
    type: GenericFormFieldType.Map,
    name: 'map',
  },
];
