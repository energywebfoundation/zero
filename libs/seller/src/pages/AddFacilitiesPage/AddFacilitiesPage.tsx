import styled from '@emotion/styled';
import {
  Breadcrumbs,
  FormNavigation,
  GenericFormMultiStep,
} from '@energyweb/zero-ui-core';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { TFunction } from 'i18next';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  AddFacilitiesBasicInformationForm,
  AddFacilitiesImagesForm,
  AddFacilitiesLocationForm,
  AddFacilitiesProductsForm,
  AddFacilitiesSustainabilityForm,
  IAddFacilitiesBasicInformationFormFields,
  IAddFacilitiesImagesFormFields,
  IAddFacilitiesLocationFormFields,
  IAddFacilitiesProductsFormFields,
  IAddFacilitiesSustainabilityFormFields
} from '../../containers';
import { useSellerAddFacilititesEffects } from './AddFacilitiesPage.effects';
import { useStyles } from './AddFacilitiesPage.styles';

export enum SellerAddFacilitiesSteps {
  BasicInformation,
  Location,
  Sustainability,
  Images,
  Products,
}

const MbBox = styled(Box)`
  margin-bottom: 40px;
`;

const DraftSavedComponent = ({ t }: { t: TFunction }) => (
  <>
    <Typography color="secondary" fontWeight={700}>
      {t('pages.SellerAddFacilitiesPage.draftSaved')}
    </Typography>
    <Box>
      <Check color="secondary" fontSize="small" sx={{ ml: '10px' }} />
    </Box>
  </>
);

export const AddFacilitiesPage = () => {
  const {
    activeStep,
    updateFacilityDraft,
    facilityDraft,
    handleNavigateToPrevStep,
    handleNavigateToNextStep,
    isLoading,
    isProcessing,
    showDraftSavedMsg,
    breadcrumbsList
  } = useSellerAddFacilititesEffects();
  const { t } = useTranslation();
  const classes = useStyles();

  if (isLoading) return <CircularProgress />;

  return (
      <Grid container justifyContent={'space-between'}>
        <Helmet>
          <title>{t('pages.SellerAddFacilitiesPage.pageTitle')}</title>
        </Helmet>
        <Breadcrumbs breadcrumbsList={breadcrumbsList} />
        <GenericFormMultiStep
          formTitle={t('pages.SellerAddFacilitiesPage.formTitle')}
          isProcessing={isProcessing}
          showDraftSavedMsg={showDraftSavedMsg}
          activeStepIndex={activeStep}
          draftSavedNode={<DraftSavedComponent t={t} />}
          stepList={[
            {
              stepLabel: t(
                'pages.SellerAddFacilitiesImagesPage.basicInformation'
              ),
              stepItemNode: (
               <MbBox>
                <AddFacilitiesBasicInformationForm
                  initialFormValues={
                    facilityDraft[
                      Number(SellerAddFacilitiesSteps.BasicInformation)
                    ] as IAddFacilitiesBasicInformationFormFields
                  }
                  submitHandler={(values) => {
                    updateFacilityDraft(
                      SellerAddFacilitiesSteps.BasicInformation,
                      values
                    );
                  }}
                >
                  <FormNavigation
                    handleNavigateToPrevStep={handleNavigateToPrevStep}
                    handleNavigateToNextStep={handleNavigateToNextStep}
                    btnClass={classes.button}
                  />
                </AddFacilitiesBasicInformationForm>
               </MbBox>
              ),
              supportCsv: false,
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.location'),
              stepItemNode: (
              <MbBox>
                <AddFacilitiesLocationForm
                  initialValues={
                    facilityDraft[
                      Number(SellerAddFacilitiesSteps.Location)
                    ] as IAddFacilitiesLocationFormFields
                  }
                  submitHandler={(values) => {
                    updateFacilityDraft(
                      SellerAddFacilitiesSteps.Location,
                      values
                    );
                  }}
                >
                  <FormNavigation
                    handleNavigateToPrevStep={handleNavigateToPrevStep}
                    handleNavigateToNextStep={handleNavigateToNextStep}
                    btnClass={classes.button}
                  />
                </AddFacilitiesLocationForm>
               </MbBox>
              ),
            },
            {
              stepLabel: t(
                'pages.SellerAddFacilitiesImagesPage.sustainability'
              ),
              stepItemNode: (
                <MbBox>
                  <AddFacilitiesSustainabilityForm
                    initialValues={
                      facilityDraft[
                        Number(SellerAddFacilitiesSteps.Sustainability)
                      ] as IAddFacilitiesSustainabilityFormFields
                    }
                    submitHandler={(values) => {
                      updateFacilityDraft(
                        SellerAddFacilitiesSteps.Sustainability,
                        values
                      );
                    }}
                  >
                    <FormNavigation
                      handleNavigateToPrevStep={handleNavigateToPrevStep}
                      handleNavigateToNextStep={handleNavigateToNextStep}
                      btnClass={classes.button}
                    />
                  </AddFacilitiesSustainabilityForm>
                </MbBox>
              ),
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.images'),
              stepItemNode: (
                <MbBox>
                  <AddFacilitiesImagesForm
                    initialValues={
                      facilityDraft[
                        Number(SellerAddFacilitiesSteps.Images)
                      ] as IAddFacilitiesImagesFormFields
                    }
                    submitHandler={(values) => {
                      updateFacilityDraft(
                        SellerAddFacilitiesSteps.Images,
                        values
                      );
                    }}
                  >
                    <FormNavigation
                      handleNavigateToPrevStep={handleNavigateToPrevStep}
                      handleNavigateToNextStep={handleNavigateToNextStep}
                      btnClass={classes.button}
                    />
                  </AddFacilitiesImagesForm>
                </MbBox>
              ),
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.products'),
              stepItemNode: (
                <MbBox>
                  <AddFacilitiesProductsForm
                    initialValues={
                      facilityDraft[
                        Number(SellerAddFacilitiesSteps.Products)
                      ] as IAddFacilitiesProductsFormFields
                    }
                    submitHandler={(values: any) => {
                      updateFacilityDraft(
                        SellerAddFacilitiesSteps.Products,
                        values
                      );
                    }}
                  >
                    <FormNavigation
                      handleNavigateToPrevStep={handleNavigateToPrevStep}
                      handleNavigateToNextStep={handleNavigateToNextStep}
                      btnClass={classes.button}
                    />
                  </AddFacilitiesProductsForm>
                </MbBox>
              ),
            },
          ]}
        />
      </Grid>
  );
};
