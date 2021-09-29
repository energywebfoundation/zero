import { SellerAddFacilitiesBasicInformationFormFields } from "../../components/seller-add-facilities-basic-information-form/seller-add-facilities-basic-information-form";
import { SellerAddFacilitiesImagesFormFields } from "../../components/seller-add-facilities-images-form/seller-add-facilities-images-form";
import { SellerAddFacilitiesLocationFormFields } from "../seller-add-facilities-location-page/seller-add-facilities-location-page";
import { SellerAddFacilitiesSustainabilityFormFields } from "../seller-add-facilities-sustainability-page/seller-add-facilities-sustainability-page";


type Nullable<T> = { [K in keyof T]: T[K] | null };

export type FacilityDraft = [
  Nullable<SellerAddFacilitiesBasicInformationFormFields>,
  Nullable<SellerAddFacilitiesLocationFormFields>,
  Nullable<SellerAddFacilitiesSustainabilityFormFields>,
  Nullable<SellerAddFacilitiesImagesFormFields>
];
