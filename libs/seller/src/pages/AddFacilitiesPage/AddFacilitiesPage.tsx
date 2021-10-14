import styled from '@emotion/styled';
import {
  Breadcrumbs,
  FormNavigation,
  GenericFormMultiStep,
} from '@energyweb/zero-ui-core';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  AddFacilitiesBasicInformationForm,
  AddFacilitiesImagesContainer,
  AddFacilitiesLocationContainer,
  AddFacilitiesSustainabilityForm,
  IAddFacilitiesBasicInformationFormFields,
  IAddFacilitiesImagesFormFields,
  IAddFacilitiesLocationFormFields,
  IAddFacilitiesSustainabilityFormFields
} from '../../containers';
import { useSellerAddFacilititesEffects } from './AddFacilitiesPage.effects';

export enum SellerAddFacilitiesSteps {
  BasicInformation,
  Location,
  Sustainability,
  Images,
  Products,
}

const MbBox = styled(Box)`
  margin-bottom: 40px;
`

export const AddFacilitiesPage = () => {
  const {
    activeStep,
    isProcessingFacilityDraft,
    updateFacilityDraft,
    facilityDraft,
    showDraftSavedMsg,
    handleNavigateToPrevStep,
    handleNavigateToNextStep,
    isLoading,
    breadcrumbsList
  } = useSellerAddFacilititesEffects();
  const { t } = useTranslation();

  if (isLoading) return <CircularProgress />;

  return (
      <Grid container justifyContent={'space-between'}>
        <Helmet>
          <title>{t('pages.SellerAddFacilitiesPage.pageTitle')}</title>
        </Helmet>
        <Breadcrumbs breadcrumbsList={breadcrumbsList} />
        <GenericFormMultiStep
          formTitle={t('pages.SellerAddFacilitiesPage.formTitle')}
          isProcessing={isProcessingFacilityDraft}
          showDraftSavedMsg={showDraftSavedMsg}
          processingCompletedSuccessfullyText={'Draft saved ✓'}
          processingErrorText={'Error saving draft'}
          activeStepIndex={activeStep}
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
                    activeStepIndex={activeStep}
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
                <AddFacilitiesLocationContainer
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
                    activeStepIndex={activeStep}
                  />
                </AddFacilitiesLocationContainer>
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
                      activeStepIndex={activeStep}
                    />
                  </AddFacilitiesSustainabilityForm>
                </MbBox>
              ),
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.images'),
              stepItemNode: (
                <MbBox>
                <AddFacilitiesImagesContainer
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
                    activeStepIndex={activeStep}
                  />
                </AddFacilitiesImagesContainer>
                </MbBox>
              ),
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.products'),
              stepItemNode: null,
            },
          ]}
        />
      </Grid>
  );
};
