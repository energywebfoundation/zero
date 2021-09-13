import styled from '@emotion/styled';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui';
import SellerAddFacilitiesSustainabilityForm from '../../components/seller-add-facilities-sustainability-form/seller-add-facilities-sustainability-form';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesSustainabilityPageProps {
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesSustainabilityFormFields>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SellerAddFacilitiesSustainabilityFormFields {
  facilityStory: string;
  impactStory: string;
  facilityDocumentList: Array<{ documentId: string; description: string }>;
  greenLabelList: Array<any>;
}

const StyledSellerAddFacilitiesSustainabilityPage = styled.div``;

export const SellerAddFacilitiesSustainabilityPage = ({
  submitHandler,
}: SellerAddFacilitiesSustainabilityPageProps) => (
  <StyledSellerAddFacilitiesSustainabilityPage>
    <SellerAddFacilitiesSustainabilityForm
      initialValues={{
        facilityStory: 'This is very long story',
        impactStory: 'This is the impact',
        facilityDocumentList: [],
        greenLabelList: [],
      }}
      submitHandler={submitHandler}
    />
  </StyledSellerAddFacilitiesSustainabilityPage>
);

export default SellerAddFacilitiesSustainabilityPage;
