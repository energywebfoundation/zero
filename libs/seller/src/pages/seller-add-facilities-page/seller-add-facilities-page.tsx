import styled from '@emotion/styled';
import SellerAddFacilitiesBasicInformationPage from '../seller-add-facilities-basic-information-page/seller-add-facilities-basic-information-page';
import SellerAddFacilitiesLocationPage from '../seller-add-facilities-location-page/seller-add-facilities-location-page';
import { useSellerAddFacilititesEffects } from './seller-add-facilitites.effecs';
import { GenericFormMultiStep, GreenLabelDto } from '@energyweb/zero-ui';
import { useState } from 'react';
import SellerAddFacilitiesSustainabilityPage from '../seller-add-facilities-sustainability-page/seller-add-facilities-sustainability-page';
import SellerAddFacilitiesImagesPage from '../seller-add-facilities-images-page/seller-add-facilities-images-page';
import { Grid } from '@material-ui/core';
import {
  DeviceOwnershipEnum,
  DeviceRegistryEnum,
  EnergyUnitCapacityEmum,
  FacilityFinancialSupportTypeEnum,
  RenevableEnergySourceEnum,
} from '../../components/seller-add-facilities-basic-information-form/seller-add-facilities-basic-information-form-fields';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesPagePropsEnum {}

const StyledSellerAddFacilitiesPage = styled.div``;
export enum SellerAddFacilitiesSteps {
  BasicInformation,
  Location,
  Sustainability,
  Images,
  Products,
}
export type AddFacilityFormDraft = [
  {
    deviceOwner: string;
    facilityName: string;
    registryId: string;
    eacRegistries: DeviceRegistryEnum;
    source: RenevableEnergySourceEnum;
    deviceOwnership: DeviceOwnershipEnum;
    capacityUnit: EnergyUnitCapacityEmum;
    commercialOperationDate: string;
    projectSupportedFinancially: boolean;
    typeOfFinancialSupport: FacilityFinancialSupportTypeEnum;
  },
  {
    country: string;
    region: string;
    address: string;
    gridOperator: string;
    latitude: string;
    longitude: string;
  },
  {
    facilityStory: string;
    impactStory: string;
    greenLabelList: Array<GreenLabelDto>;
  },
  { facilityImageList: Array<{ filename: string }> }
];

export const SellerAddFacilitiesPage = () => {
  const [activeStep, setActiveStep] = useState(
    SellerAddFacilitiesSteps.BasicInformation
  );
  const { handleFormSubmit } = useSellerAddFacilititesEffects();
  const { t } = useTranslation();

  return (
    <StyledSellerAddFacilitiesPage>
      <Grid container justifyContent={'space-between'}>
        <GenericFormMultiStep<SellerAddFacilitiesSteps>
          formTitle={'Add facilities'}
          activeStepIndex={activeStep}
          stepList={[
            {
              stepLabel: t(
                'pages.SellerAddFacilitiesImagesPage.basicInformation'
              ),
              stepItemNode: (
                <SellerAddFacilitiesBasicInformationPage
                  submitHandler={async (values, resetForm) => {
                    console.log(values);
                  }}
                />
              ),
              supportCsv: true,
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.location'),
              stepItemNode: (
                <SellerAddFacilitiesLocationPage
                  submitHandler={async (values, resetForm) => {
                    console.log(values);
                  }}
                />
              ),
            },
            {
              stepLabel: t(
                'pages.SellerAddFacilitiesImagesPage.sustainability'
              ),
              stepItemNode: (
                <SellerAddFacilitiesSustainabilityPage
                  submitHandler={async (values, resetForm) => {
                    console.log(values);
                  }}
                />
              ),
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.images'),
              stepItemNode: (
                <SellerAddFacilitiesImagesPage
                  submitHandler={async (values, resetForm) => {
                    console.log(values);
                  }}
                />
              ),
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.products'),
              stepItemNode: null,
            },
          ]}
          handleActiveIndexChange={setActiveStep}
        />
      </Grid>
    </StyledSellerAddFacilitiesPage>
  );
};

export default SellerAddFacilitiesPage;
