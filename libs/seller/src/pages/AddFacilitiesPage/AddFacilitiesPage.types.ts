import {
  IAddFacilitiesBasicInformationFormFields,
  IAddFacilitiesImagesFormFields,
  IAddFacilitiesLocationFormFields,
  IAddFacilitiesSustainabilityFormFields,
  IAddFacilitiesProductsFormFields
} from "../../containers";


type Nullable<T> = { [K in keyof T]: T[K] | null };

export type FacilityDraftItem =
  | Nullable<IAddFacilitiesBasicInformationFormFields>
  | Nullable<IAddFacilitiesLocationFormFields>
  | Nullable<IAddFacilitiesSustainabilityFormFields>
  | Nullable<IAddFacilitiesImagesFormFields>
  | Nullable<IAddFacilitiesProductsFormFields>;

export type FacilityDraft = [
  Nullable<IAddFacilitiesBasicInformationFormFields>,
  Nullable<IAddFacilitiesLocationFormFields>,
  Nullable<IAddFacilitiesSustainabilityFormFields>,
  Nullable<IAddFacilitiesImagesFormFields>,
  Nullable<IAddFacilitiesProductsFormFields>
];
