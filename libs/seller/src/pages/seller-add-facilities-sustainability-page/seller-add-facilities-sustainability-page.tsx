import styled from '@emotion/styled';
import {
  FacilityDocumentDto,
  GreenLabelDto,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import SellerAddFacilitiesSustainabilityForm from '../../components/seller-add-facilities-sustainability-form/seller-add-facilities-sustainability-form';
import { ReactElement } from 'react';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesSustainabilityPageProps {
  initialValues: SellerAddFacilitiesSustainabilityFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesSustainabilityFormFields>;
  children: ReactElement;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SellerAddFacilitiesSustainabilityFormFields {
  facilityStory: string;
  impactStory: string;
  facilityDocumentList: Array<FacilityDocumentDto>;
  greenLabelList: Array<GreenLabelDto>;
  sustainabilityDocumentList: Array<FacilityDocumentDto>;
}

const StyledSellerAddFacilitiesSustainabilityPage = styled.div``;

export const SellerAddFacilitiesSustainabilityPage = ({
  submitHandler,
  initialValues,
  children,
}: SellerAddFacilitiesSustainabilityPageProps) => (
  <StyledSellerAddFacilitiesSustainabilityPage>
    <SellerAddFacilitiesSustainabilityForm
      initialValues={initialValues}
      submitHandler={submitHandler}
      children={children}
    />
  </StyledSellerAddFacilitiesSustainabilityPage>
);

export default SellerAddFacilitiesSustainabilityPage;
