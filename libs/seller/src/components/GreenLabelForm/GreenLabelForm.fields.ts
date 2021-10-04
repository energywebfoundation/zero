import { GenericFormFieldType, TGenericFormFieldList } from "@energyweb/zero-ui-core";

const enum GreenLabelTypeEnum {
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

export const greenLabelFormFields: TGenericFormFieldList = [
  {
    label: null,
    name: 'greenLabel',
    type: GenericFormFieldType.Autocomplete,
    options: greenLabelFormFieldOptionList,
  },
];
