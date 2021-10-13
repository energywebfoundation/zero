import {
  CallToActionButton,
  GenericFormCard,
  GenericFormContainer,
  GenericFormFieldContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import { Box, Divider, Grid, Typography } from '@material-ui/core';
import { ReactElement } from 'react';
import { addFacilitiesBasicInformationFormSchema } from './AddFacilitiesBasicInformationForm.schema';
import {
  IAddFacilitiesBasicInformationFormFields,
  addFacilitiesBasicInformationFormFields,
} from './AddFacilitiesBasicInformationForm.fields';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { FileUpload, FolderOpen } from '@material-ui/icons';

export interface AddFacilitiesBasicInformationFormProps {
  submitHandler: TGenericFormSubmitHandlerFn<IAddFacilitiesBasicInformationFormFields>;
  initialFormValues: IAddFacilitiesBasicInformationFormFields;
  children?: ReactElement;
}

const StyledTypography = styled(Typography)`
  font-weight: 700;
  font-size: 20px;
`;

const StyledDivider = styled(Divider)`
  width: 100%;
  margin: 32px 0;
`

const MlBox = styled(Box)`
  margin-left: 8px;
`

const MbBox = styled(Box)`
  margin-bottom: 40px;
`

export const AddFacilitiesBasicInformationForm = ({
  submitHandler,
  initialFormValues,
  children,
}: AddFacilitiesBasicInformationFormProps) => {
  const { t } = useTranslation();
  return (
  <GenericFormContainer<IAddFacilitiesBasicInformationFormFields>
    submitHandler={submitHandler}
    validationSchema={addFacilitiesBasicInformationFormSchema}
    initialValues={initialFormValues}
    fields={addFacilitiesBasicInformationFormFields}
  >
  <GenericFormCard>
    <StyledTypography color="primary">
      {t('forms.SellerAddFacilitiesBasicInformationForm.basicFacilityData')}
    </StyledTypography>
      <Grid container spacing={'20px'}>
        <Grid item sm={6}>
          <GenericFormFieldContainer fieldName={'deviceOwner'} />
          <GenericFormFieldContainer fieldName={'facilityId'} />
          <GenericFormFieldContainer fieldName={'registryId'} />
          <GenericFormFieldContainer fieldName={'deviceOwnership'} />
        </Grid>
        <Grid item sm={6}>
          <GenericFormFieldContainer fieldName={'facilityName'} />
          <GenericFormFieldContainer fieldName={'eacRegistries'} />
          <GenericFormFieldContainer fieldName={'source'} />
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center">
            <Typography color="primary" fontWeight={700}>
              Add document proof
            </Typography>
            <CallToActionButton
              sx={{ marginLeft: '27px', marginRight: '16px' }}
              startIcon={<FolderOpen />}
              translateKey="forms.chooseFromUploadedDocs"
            />
            <CallToActionButton
              startIcon={<FileUpload />}
              translateKey="forms.uploadFromComputer"
            />
          </Box>
        </Grid>
      </Grid>
        <StyledDivider />
        <StyledTypography color="primary">
          {t('forms.SellerAddFacilitiesBasicInformationForm.commercialData')}
        </StyledTypography>
      <Grid container spacing={'20px'}>
        <Grid item sm={6}>
          <Box display="flex">
            <GenericFormFieldContainer
              fullWidth
              fieldName={'installedCapacity'}
            />
            <MlBox>
              <GenericFormFieldContainer
                boxWidth={'90px'}
                fieldName={'capacityUnit'}
              />
            </MlBox>
          </Box>
          <Box display="flex">
            <GenericFormFieldContainer
              fullWidth
              fieldName={'certifiedAmount'}
            />
            <MlBox>
              <GenericFormFieldContainer
                boxWidth={'90px'}
                fieldName={'capacityUnit'}
              />
            </MlBox>
          </Box>
          <Box>
            <GenericFormFieldContainer
              fieldName={'projectSupportedFinancially'}
            />
          </Box>
        </Grid>
        <Grid item sm={6}>
          <GenericFormFieldContainer fieldName={'commercialOperationDate'} />
          <GenericFormFieldContainer fieldName={'amountToBeCertified'} />
          <GenericFormFieldContainer fieldName={'typeOfFinancialSupport'} />
        </Grid>
      </Grid>
  </GenericFormCard>
    {children}
  </GenericFormContainer>
);
}
