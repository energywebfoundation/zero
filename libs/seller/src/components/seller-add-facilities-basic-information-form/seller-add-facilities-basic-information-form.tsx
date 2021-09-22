import styled from '@emotion/styled';
import {
  GenericFormCard,
  GenericFormContainer,
  GenericFormFieldContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui';
import { sellerAddFacilitiesBasicInformationFormSchema } from './seller-add-facilities-basic-information-form.schema';
import {
  DeviceOwnershipEnum,
  DeviceRegistryEnum,
  EnergyUnitCapacityEmum,
  FacilityFinancialSupportTypeEnum,
  RenevableEnergySourceEnum,
  sellerAddFacilitiesBasicInformationFormFields,
} from './seller-add-facilities-basic-information-form-fields';
import { Box, Grid } from '@material-ui/core';
import { ReactElement } from 'react';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesBasicInformationFormProps {
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesBasicInformationFormFields>;
  initialFormValues: SellerAddFacilitiesBasicInformationFormFields;
  children: ReactElement;
}

const StyledSellerAddFacilitiesBasicInformationForm = styled.div``;

export interface SellerAddFacilitiesBasicInformationFormFields {
  deviceOwner: string;
  facilityName: string;
  eacRegistries: DeviceRegistryEnum;
  registryId: string;
  source: RenevableEnergySourceEnum;
  deviceOwnership: DeviceOwnershipEnum;
  projectSupportedFinancially: boolean;
  installedCapacity: string;
  capacityUnit: EnergyUnitCapacityEmum;
  commercialOperationDate: string;
  typeOfFinancialSupport: FacilityFinancialSupportTypeEnum;
}

export const SellerAddFacilitiesBasicInformationForm = ({
  submitHandler,
  initialFormValues,
  children,
}: SellerAddFacilitiesBasicInformationFormProps) => (
  <StyledSellerAddFacilitiesBasicInformationForm>
    <GenericFormCard>
      <GenericFormContainer<SellerAddFacilitiesBasicInformationFormFields>
        submitHandler={submitHandler}
        validationSchema={sellerAddFacilitiesBasicInformationFormSchema}
        initialValues={initialFormValues}
        fields={sellerAddFacilitiesBasicInformationFormFields}
      >
        <Grid container spacing={'20px'}>
          <Grid item sm={6}>
            <GenericFormFieldContainer fieldName={'deviceOwner'} />
            <GenericFormFieldContainer fieldName={'eacRegistries'} />
            <GenericFormFieldContainer fieldName={'source'} />
          </Grid>
          <Grid item sm={6}>
            <GenericFormFieldContainer fieldName={'facilityName'} />
            <GenericFormFieldContainer fieldName={'registryId'} />
            <GenericFormFieldContainer fieldName={'deviceOwnership'} />
          </Grid>
          <Grid item sm={6}>
            <Box display={'flex'}>
              <Box mr={'8px'} flexGrow={1}>
                <GenericFormFieldContainer
                  fullWidth
                  fieldName={'installedCapacity'}
                />
              </Box>
              <GenericFormFieldContainer
                boxWidth={'90px'}
                fieldName={'capacityUnit'}
              />
            </Box>
            <Box>
              <GenericFormFieldContainer
                fieldName={'projectSupportedFinancially'}
              />
            </Box>
          </Grid>
          <Grid item sm={6}>
            <GenericFormFieldContainer fieldName={'commercialOperationDate'} />
            <GenericFormFieldContainer fieldName={'typeOfFinancialSupport'} />
          </Grid>
        </Grid>
        {children}
      </GenericFormContainer>
    </GenericFormCard>
  </StyledSellerAddFacilitiesBasicInformationForm>
);

export default SellerAddFacilitiesBasicInformationForm;
