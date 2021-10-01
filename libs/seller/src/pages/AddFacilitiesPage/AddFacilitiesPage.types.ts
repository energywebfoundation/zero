import {
  IAddFacilitiesBasicInformationFormFields,
  IAddFacilitiesImagesFormFields,
  IAddFacilitiesLocationFormFields,
  IAddFacilitiesSustainabilityFormFields
} from "../../containers";


type Nullable<T> = { [K in keyof T]: T[K] | null };

export type FacilityDraft = [
  Nullable<IAddFacilitiesBasicInformationFormFields>,
  Nullable<IAddFacilitiesLocationFormFields>,
  Nullable<IAddFacilitiesSustainabilityFormFields>,
  Nullable<IAddFacilitiesImagesFormFields>
];
