import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui-core';

export interface IAddFacilitiesImagesFormFields {
  facilityImageList: string[];
}

export const addFacilitiesImagesFormFields: TGenericFormFieldList = [
  {
    label: '',
    type: GenericFormFieldType.ImageUpload,
    name: 'facilityImageList',
    title: 'images.images',
    subtitle: 'forms.SellerAddFacilitiesImagesForm.youCanAddImagesLater',
  },
];
