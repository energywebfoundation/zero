import {
  GenericFormCard,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ReactElement } from 'react';
import SellerAddFacilitiesLocationForm from '../../components/seller-add-facilities-location-form/seller-add-facilities-location-form';

export interface SellerAddFacilitiesLocationFormFields {
  country: string;
  region: string;
  gridOperator: string;
  address: string;
  latitude: string;
  longitude: string;
}

export interface SellerAddFacilitiesLocationPageProps {
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesLocationFormFields>;
  initialValues: SellerAddFacilitiesLocationFormFields;
  children: ReactElement;
}

export const SellerAddFacilitiesLocationPage = ({
  submitHandler,
  initialValues,
  children,
}: SellerAddFacilitiesLocationPageProps) => {
  const { t } = useTranslation();
  return (
      <GenericFormCard>
        <Typography color={'primary'} fontSize={'20px'} fontWeight={700}>
          {t('forms.SellerAddFacilitiesLocationForm.location')}
        </Typography>
        <SellerAddFacilitiesLocationForm
          initialValues={initialValues}
          submitHandler={submitHandler}
        >
          {children}
        </SellerAddFacilitiesLocationForm>
      </GenericFormCard>
  );
};

export default SellerAddFacilitiesLocationPage;
