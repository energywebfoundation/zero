import styled from '@emotion/styled';
import SellerAddFacilitiesBasicInformationForm, {
  SellerAddFacilitiesBasicInformationFormFields,
} from '../../components/seller-add-facilities-basic-information-form/seller-add-facilities-basic-information-form';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesBasicInformationPageProps {
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesBasicInformationFormFields>;
}

const StyledSellerAddFacilitiesBasicInformationPage = styled.div``;

export const SellerAddFacilitiesBasicInformationPage = ({
  submitHandler,
}: SellerAddFacilitiesBasicInformationPageProps) => (
  <StyledSellerAddFacilitiesBasicInformationPage>
    <SellerAddFacilitiesBasicInformationForm submitHandler={submitHandler} />
  </StyledSellerAddFacilitiesBasicInformationPage>
);

export default SellerAddFacilitiesBasicInformationPage;
