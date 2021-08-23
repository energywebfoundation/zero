import styled from '@emotion/styled';
import {
  GenericFormCard,
  GenericFormContainer,
  GenericFormFieldContainer,
  Info,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui';
import { sellerAddFacilitiesBasicInformationFormSchema } from './seller-add-facilities-basic-information-form.schema';
import {
  EnergyUnitCapacityEmum,
  sellerAddFacilitiesBasicInformationFormFields,
} from './seller-add-facilities-basic-information-form-fields';
import { Box, Grid } from '@material-ui/core';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesBasicInformationFormProps {
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesBasicInformationFormFields>;
}

const StyledSellerAddFacilitiesBasicInformationForm = styled.div``;

export interface SellerAddFacilitiesBasicInformationFormFields {
  deviceOwner: string;
  facilityName: string;
  eacRegistries: string;
  registryId: string;
  source: string;
  deviceOwnership: string;
  projectSupportedFinancially: boolean;
  installedCapacity: string;
  capacityUnit: string;
  commercialOperationDate: string;
  typeOfFinancialSupport: string;
}

export const SellerAddFacilitiesBasicInformationForm = ({
  submitHandler,
}: SellerAddFacilitiesBasicInformationFormProps) => (
  <StyledSellerAddFacilitiesBasicInformationForm>
    <GenericFormCard>
      <GenericFormContainer<SellerAddFacilitiesBasicInformationFormFields>
        submitHandler={submitHandler}
        validationSchema={sellerAddFacilitiesBasicInformationFormSchema}
        initialValues={{
          deviceOwner: '',
          facilityName: '',
          registryId: '',
          eacRegistries: '',
          source: '',
          deviceOwnership: '',
          installedCapacity: '',
          capacityUnit: EnergyUnitCapacityEmum.MWh,
          commercialOperationDate: '',
          projectSupportedFinancially: false,
          typeOfFinancialSupport: '',
        }}
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
      </GenericFormContainer>
    </GenericFormCard>
  </StyledSellerAddFacilitiesBasicInformationForm>
);

export default SellerAddFacilitiesBasicInformationForm;
