import {
  FormDocument,
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui-core';

export interface IAddFacilitiesSustainabilityFormFields {
  facilityStory: string;
  impactStory: string;
  facilityDocumentList: Array<FormDocument>;
  sustainabilityDocumentList: Array<FormDocument>;
}

export const addFacilitiesSustainabilityFormFields: TGenericFormFieldList =
  [
    {
      label: '',
      type: GenericFormFieldType.Textarea,
      name: 'facilityStory',
      characterCountLimit: 3000,
      placeholderText: 'forms.SellerAddFacilitiesSustainabilityForm.facilityStoryPlaceholderText',
      textFieldProps: { minRows: 12 }
    },
    {
      label: 'forms.SellerAddFacilitiesSustainabilityForm.facilityDocuments',
      type: GenericFormFieldType.DocumentList,
      name: 'facilityDocumentList',
    },
    {
      label: '',
      type: GenericFormFieldType.Textarea,
      name: 'impactStory',
      characterCountLimit: 2000,
      textFieldProps: { minRows: 12 },
      placeholderText:
        'forms.SellerAddFacilitiesSustainabilityForm.impactStoryPlaceholderText',
    },
    {
      label: null,
      type: GenericFormFieldType.DocumentList,
      name: 'sustainabilityDocumentList',
    },
  ];
