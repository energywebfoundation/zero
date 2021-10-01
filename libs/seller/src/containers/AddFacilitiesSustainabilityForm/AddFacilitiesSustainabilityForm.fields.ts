import {
  GenericFormFieldType,
  TGenericFormFieldList,
} from '@energyweb/zero-ui-core';
import { FacilityDocument } from '../../components/FacilityDocumentItem';
import { IGreenLabel } from '../../components/GreenLabelForm';

export interface IAddFacilitiesSustainabilityFormFields {
  facilityStory: string;
  impactStory: string;
  facilityDocumentList: Array<FacilityDocument>;
  greenLabelList: Array<IGreenLabel>;
  sustainabilityDocumentList: Array<FacilityDocument>;
}

export const addFacilitiesSustainabilityFormFields: TGenericFormFieldList =
  [
    {
      label: 'forms.SellerAddFacilitiesSustainabilityForm.facilityStory',
      type: GenericFormFieldType.Textarea,
      name: 'facilityStory',
      characterCountLimit: 3000,
    },
    {
      label: null,
      type: GenericFormFieldType.GreenLabelList,
      name: 'greenLabelList',
    },
    {
      label: 'forms.SellerAddFacilitiesSustainabilityForm.facilityDocuments',
      type: GenericFormFieldType.FacilityDocumentList,
      name: 'facilityDocumentList',
    },
    {
      label: 'forms.SellerAddFacilitiesSustainabilityForm.impactStory',
      type: GenericFormFieldType.Textarea,
      name: 'impactStory',
      characterCountLimit: 2000,
      placeholderText:
        'forms.SellerAddFacilitiesSustainabilityForm.impactStoryPlaceholderText',
    },
    {
      label: null,
      type: GenericFormFieldType.FacilityDocumentList,
      name: 'sustainabilityDocumentList',
    },
  ];