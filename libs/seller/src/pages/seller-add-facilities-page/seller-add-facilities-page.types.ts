import {
  SellerAddFacilitiesBasicInformationFormFields,
  SellerAddFacilitiesImagesFormFields,
  SellerAddFacilitiesLocationFormFields,
  SellerAddFacilitiesSustainabilityFormFields,
} from '@energy-web-zero/seller';

type Nullable<T> = { [K in keyof T]: T[K] | null };

export type FacilityDraft = [
  Nullable<SellerAddFacilitiesBasicInformationFormFields>,
  Nullable<SellerAddFacilitiesLocationFormFields>,
  Nullable<SellerAddFacilitiesSustainabilityFormFields>,
  Nullable<SellerAddFacilitiesImagesFormFields>
];
