import styled from '@emotion/styled';
import {
  GenericFormCard,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui';
import SellerAddFacilitiesLocationForm from '../../components/seller-add-facilities-location-form/seller-add-facilities-location-form';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export interface SellerAddFacilitiesLocationFormFields {
  country: string;
  region: string;
  gridOperator: string;
  address: string;
  latitude: string;
  longitude: string;
}

/* eslint-disable-next-line */
export interface SellerAddFacilitiesLocationPageProps {
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesLocationFormFields>;
}

const StyledSellerAddFacilitiesLocationPage = styled.div``;

export const SellerAddFacilitiesLocationPage = ({
  submitHandler,
}: SellerAddFacilitiesLocationPageProps) => {
  const { t } = useTranslation();
  return (
    <StyledSellerAddFacilitiesLocationPage>
      <GenericFormCard>
        <Typography color={'primary'} fontSize={'20px'} fontWeight={700}>
          {t('forms.SellerAddFacilitiesLocationForm.location')}
        </Typography>
        <SellerAddFacilitiesLocationForm submitHandler={submitHandler} />
      </GenericFormCard>
    </StyledSellerAddFacilitiesLocationPage>
  );
};

export default SellerAddFacilitiesLocationPage;
