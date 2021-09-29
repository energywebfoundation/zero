import {
  FacilityDocument,
  IGreenLabel,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import { ReactElement } from 'react';
import SellerAddFacilitiesSustainabilityForm from '../../components/seller-add-facilities-sustainability-form/seller-add-facilities-sustainability-form';

export interface SellerAddFacilitiesSustainabilityPageProps {
  initialValues: SellerAddFacilitiesSustainabilityFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesSustainabilityFormFields>;
  children: ReactElement;
}

export interface SellerAddFacilitiesSustainabilityFormFields {
  facilityStory: string;
  impactStory: string;
  facilityDocumentList: Array<FacilityDocument>;
  greenLabelList: Array<IGreenLabel>;
  sustainabilityDocumentList: Array<FacilityDocument>;
}

export const SellerAddFacilitiesSustainabilityPage = ({
  submitHandler,
  initialValues,
  children,
}: SellerAddFacilitiesSustainabilityPageProps) => (
    <SellerAddFacilitiesSustainabilityForm
      initialValues={initialValues}
      submitHandler={submitHandler}
      children={children}
    />
);

export default SellerAddFacilitiesSustainabilityPage;
