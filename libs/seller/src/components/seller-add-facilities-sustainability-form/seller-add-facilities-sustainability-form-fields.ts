import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui';

export const sellerAddFacilitiesSustainabilityFormFields: TGenericFormFieldList =
  [
    {
      label: 'forms.SellerAddFacilitiesSustainabilityPage.facilityStory',
      type: GenericFormFieldType.Textarea,
      name: 'facilityStory',
      characterCountLimit: 3000,
    },
    {
      label: 'forms.SellerAddFacilitiesSustainabilityPage.facilityStory',
      type: GenericFormFieldType.GreenLabelList,
      name: 'greenLabelList',
    },
    {
      label: 'forms.SellerAddFacilitiesSustainabilityPage.facilityDocuments',
      type: GenericFormFieldType.FacilityDocumentList,
      name: 'facilityDocuments',
    },
    {
      label: 'forms.SellerAddFacilitiesSustainabilityPage.impactStory',
      type: GenericFormFieldType.Textarea,
      name: 'impactStory',
      characterCountLimit: 2000,
      placeholderText:
        'forms.SellerAddFacilitiesSustainabilityPage.impactStoryPlaceholderText',
    },
    {
      label: 'forms.SellerAddFacilitiesSustainabilityPage.impactStory',
      type: GenericFormFieldType.FacilityDocumentList,
      name: 'sustainabilityDocuments',
      placeholderText:
        'forms.SellerAddFacilitiesSustainabilityPage.impactStoryPlaceholderText',
    },
  ];
