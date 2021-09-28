import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui-core';

export const sellerAddFacilitiesImagesFormFields: TGenericFormFieldList = [
  {
    label: null,
    type: GenericFormFieldType.ImageUpload,
    name: 'facilityImageList',
    helpBoxText: `You can add images later. 75% of buyers think images are important
            to give credibility and transparency to your facility, products and
            services`,
  },
];
