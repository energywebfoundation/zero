import styled from '@emotion/styled';
import SellerAddFacilitiesBasicInformationForm, {
  SellerAddFacilitiesBasicInformationFormFields,
} from '../../components/seller-add-facilities-basic-information-form/seller-add-facilities-basic-information-form';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui';
import { ReactElement } from 'react';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesBasicInformationPageProps {
  initialValues: SellerAddFacilitiesBasicInformationFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesBasicInformationFormFields>;
  children: ReactElement;
}

const StyledSellerAddFacilitiesBasicInformationPage = styled.div``;

export const SellerAddFacilitiesBasicInformationPage = ({
  submitHandler,
  initialValues,
  children,
}: SellerAddFacilitiesBasicInformationPageProps) => (
  <StyledSellerAddFacilitiesBasicInformationPage>
    <SellerAddFacilitiesBasicInformationForm
      children={children}
      initialFormValues={initialValues}
      submitHandler={submitHandler}
    />
  </StyledSellerAddFacilitiesBasicInformationPage>
);

export default SellerAddFacilitiesBasicInformationPage;
