import SellerAddFacilitiesBasicInformationForm, {
  SellerAddFacilitiesBasicInformationFormFields,
} from '../../components/seller-add-facilities-basic-information-form/seller-add-facilities-basic-information-form';
import { TGenericFormSubmitHandlerFn } from '@energyweb/zero-ui-core';
import { ReactElement } from 'react';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesBasicInformationPageProps {
  initialValues: SellerAddFacilitiesBasicInformationFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesBasicInformationFormFields>;
  children: ReactElement;
}

export const SellerAddFacilitiesBasicInformationPage = ({
  submitHandler,
  initialValues,
  children,
}: SellerAddFacilitiesBasicInformationPageProps) => (
  <SellerAddFacilitiesBasicInformationForm
    children={children}
    initialFormValues={initialValues}
    submitHandler={submitHandler}
  />
);

export default SellerAddFacilitiesBasicInformationPage;
