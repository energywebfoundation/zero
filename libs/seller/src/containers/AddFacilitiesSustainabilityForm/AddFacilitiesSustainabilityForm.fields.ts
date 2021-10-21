import {
  FileTypeEnum,
  FormDocument,
  GenericFormFieldType,
  SelectAndFileFieldItem,
  StoredFile,
  TGenericFormFieldList,
} from '@energyweb/zero-ui-core';
import { UploadFileDto, UploadFileResponseDto } from '@energyweb/zero-api-client'
import { UseMutateAsyncFunction } from 'react-query';

export interface IAddFacilitiesSustainabilityFormFields {
  facilityStory: string;
  impactStory: string;
  facilityDocumentList: Array<FormDocument>;
  greenLabel: Array<SelectAndFileFieldItem>;
  sustainabilityDocumentList: Array<FormDocument>;
}

export enum GreenLabelTypeEnum {
  EKOenergy = 'EKOenergy',
  GreenE = 'Green-E',
  BraMiljoval = 'Bra Miljöval',
  OkPower = 'OK POWER',
  TuVNord = 'TuV Nord',
  TuvSud = 'TuV Sud',
  NaturmadeStar = 'Naturmade Star',
}

export const greenLabelFormFieldOptionList = [
  { label: GreenLabelTypeEnum.EKOenergy, value: GreenLabelTypeEnum.EKOenergy },
  { label: GreenLabelTypeEnum.GreenE, value: GreenLabelTypeEnum.GreenE },
  {
    label: GreenLabelTypeEnum.BraMiljoval,
    value: GreenLabelTypeEnum.BraMiljoval,
  },
  { label: GreenLabelTypeEnum.OkPower, value: GreenLabelTypeEnum.OkPower },
  { label: GreenLabelTypeEnum.TuVNord, value: GreenLabelTypeEnum.TuVNord },
  { label: GreenLabelTypeEnum.TuvSud, value: GreenLabelTypeEnum.TuvSud },
  {
    label: GreenLabelTypeEnum.NaturmadeStar,
    value: GreenLabelTypeEnum.NaturmadeStar,
  },
];

type SustainabilityMutateUploadFunc = UseMutateAsyncFunction<UploadFileResponseDto, unknown, {
  data: UploadFileDto;
}, unknown>

export const addFacilitiesSustainabilityFormFields = (
  mutateUpload: SustainabilityMutateUploadFunc,
): TGenericFormFieldList => {
  const fileUploadHandler = async (file: File) => {
    const storedFile: StoredFile = await mutateUpload({ data: {file} })
      .then(response => (
        {
          id: response.id ?? '',
          name: file.name,
          type: file.type
        }
      ));
    return storedFile;
  };

  return [
    {
      label: '',
      type: GenericFormFieldType.Textarea,
      name: 'facilityStory',
      characterCountLimit: 3000,
      placeholderText: 'forms.SellerAddFacilitiesSustainabilityForm.facilityStoryPlaceholderText',
      textFieldProps: { minRows: 12 }
    },
    {
      label: 'file.addDocumentProof',
      type: GenericFormFieldType.DocumentList,
      name: 'facilityDocumentList',
    },
    {
      label: '',
      name: 'greenLabel',
      type: GenericFormFieldType.SelectAndFile,
      uploadButtonText: 'file.uploadProof',
      addItemBtnText: 'forms.SellerAddFacilitiesSustainabilityForm.addGreenLabel',
      options: greenLabelFormFieldOptionList,
      acceptedFileTypes: [FileTypeEnum.PDF],
      fileUploadHandler: fileUploadHandler,
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
      label: 'file.addDocumentProof',
      type: GenericFormFieldType.DocumentList,
      name: 'sustainabilityDocumentList',
    },
  ];
}
