import {
  GenericFormMultiStep,
} from '@energyweb/zero-ui-core';
import { CircularProgress, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import {
  AddFacilitiesBasicInformationForm,
  AddFacilitiesSustainabilityForm,
  IAddFacilitiesBasicInformationFormFields,
  IAddFacilitiesImagesFormFields,
  IAddFacilitiesLocationFormFields,
  IAddFacilitiesSustainabilityFormFields,
  FormNavigation
} from '../../components';
import {
  AddFacilitiesImagesContainer,
  AddFacilitiesLocationContainer
} from '../../containers';

import { useSellerAddFacilititesEffects } from './AddFacilitiesPage.effects';

export enum SellerAddFacilitiesSteps {
  BasicInformation = 0,
  Location = 1,
  Sustainability = 2,
  Images = 3,
  Products = 4,
}

export const AddFacilitiesPage = () => {
  const {
    activeStep,
    isProcessingFacilityDraft,
    updateFacilityDraft,
    facilityDraft,
    showDraftSavedMsg,
    handleNavigateToPrevStep,
    handleNavigateToNextStep,
    isLoading
  } = useSellerAddFacilititesEffects();
  const { t } = useTranslation();

  if(isLoading) return <CircularProgress />;

  return (
      <Grid container justifyContent={'space-between'}>
        <GenericFormMultiStep<SellerAddFacilitiesSteps>
          formTitle={'Add facilities'}
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
              ),
              supportCsv: false,
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.location'),
              stepItemNode: (
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
              ),
            },
            {
              stepLabel: t(
                'pages.SellerAddFacilitiesImagesPage.sustainability'
              ),
              stepItemNode: (
                <AddFacilitiesSustainabilityForm
                  initialValues={
                    facilityDraft[
                      Number(SellerAddFacilitiesSteps.Sustainability)
                    ] as IAddFacilitiesSustainabilityFormFields
                  }
                  submitHandler={async (values, resetForm) => {
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
              ),
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.images'),
              stepItemNode: (
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
                    handleNavigateToNextStep={handleNavigateToPrevStep}
                    activeStepIndex={activeStep}
                  />
                </AddFacilitiesImagesContainer>
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
