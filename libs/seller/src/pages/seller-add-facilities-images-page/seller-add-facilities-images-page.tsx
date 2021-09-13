import styled from '@emotion/styled';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui';
import SellerAddFacilitiesImagesForm, {
  SellerAddFacilitiesImagesFormFields,
} from '../../components/seller-add-facilities-images-form/seller-add-facilities-images-form';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesImagesPageProps {
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesImagesFormFields>;
}

const StyledSellerAddFacilitiesImagesPage = styled.div``;

export const SellerAddFacilitiesImagesPage = ({
  submitHandler,
}: SellerAddFacilitiesImagesPageProps) => (
  <StyledSellerAddFacilitiesImagesPage>
    <SellerAddFacilitiesImagesForm submitHandler={submitHandler} />
  </StyledSellerAddFacilitiesImagesPage>
);

export default SellerAddFacilitiesImagesPage;
