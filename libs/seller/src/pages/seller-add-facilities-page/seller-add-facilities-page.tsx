import styled from '@emotion/styled';
import SellerAddFacilitiesBasicInformationPage from '../seller-add-facilities-basic-information-page/seller-add-facilities-basic-information-page';
import SellerAddFacilitiesLocationPage, {
  SellerAddFacilitiesLocationFormFields,
} from '../seller-add-facilities-location-page/seller-add-facilities-location-page';
import { useSellerAddFacilititesEffects } from './seller-add-facilitites.effects';
import {
  GenericFormMultiStep,
  GenericFormSubmitButtonContainer,
} from '@energyweb/zero-ui-core';
import SellerAddFacilitiesSustainabilityPage, {
  SellerAddFacilitiesSustainabilityFormFields,
} from '../seller-add-facilities-sustainability-page/seller-add-facilities-sustainability-page';
import SellerAddFacilitiesImagesPage from '../seller-add-facilities-images-page/seller-add-facilities-images-page';
import { Box, Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { SellerAddFacilitiesImagesFormFields } from '../../components/seller-add-facilities-images-form/seller-add-facilities-images-form';
import { SellerAddFacilitiesBasicInformationFormFields } from '../../components/seller-add-facilities-basic-information-form/seller-add-facilities-basic-information-form';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const StyledSellerAddFacilitiesPage = styled.div``;
export enum SellerAddFacilitiesSteps {
  BasicInformation = 0,
  Location = 1,
  Sustainability = 2,
  Images = 3,
  Products = 4,
}

const FormNavigation = ({
  activeStepIndex,
  handleNavigateToPrevStep,
  handleNavigateToNextStep,
}: {
  activeStepIndex: number;
  handleNavigateToPrevStep: () => void;
  handleNavigateToNextStep: () => void;
}) => (
  <Grid container>
    <Grid item xs={12}>
      <Box mt={3} display={'flex'} justifyContent={'space-between'}>
        <Button
          onClick={() => handleNavigateToPrevStep()}
          startIcon={<ChevronLeft />}
          variant={'contained'}
          color={'primary'}
          disabled={activeStepIndex === 0}
        >
          prev
        </Button>
        <GenericFormSubmitButtonContainer
          render={({ onSubmit, isValid, isDirty, isSubmitting }) => (
            <Button
              endIcon={<ChevronRight />}
              onClick={() => {
                onSubmit().then((value) => handleNavigateToNextStep());
              }}
              color={'primary'}
              variant={'contained'}
              disabled={!isValid || !isDirty || isSubmitting}
            >
              next
            </Button>
          )}
        />
      </Box>
    </Grid>
  </Grid>
);

export const SellerAddFacilitiesPage = () => {
  const {
    activeStep,
    isProcessingFacilityDraft,
    updateFacilityDraft,
    facilityDraft,
    showDraftSavedMsg,
    handleNavigateToPrevStep,
    handleNavigateToNextStep,
  } = useSellerAddFacilititesEffects();
  const { t } = useTranslation();

  return (
    <StyledSellerAddFacilitiesPage>
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
                <SellerAddFacilitiesBasicInformationPage
                  initialValues={
                    facilityDraft[
                      Number(SellerAddFacilitiesSteps.BasicInformation)
                    ] as SellerAddFacilitiesBasicInformationFormFields
                  }
                  submitHandler={async (values, resetForm) => {
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
                </SellerAddFacilitiesBasicInformationPage>
              ),
              supportCsv: false,
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.location'),
              stepItemNode: (
                <SellerAddFacilitiesLocationPage
                  initialValues={
                    facilityDraft[
                      Number(SellerAddFacilitiesSteps.Location)
                    ] as SellerAddFacilitiesLocationFormFields
                  }
                  submitHandler={async (values, resetForm) => {
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
                </SellerAddFacilitiesLocationPage>
              ),
            },
            {
              stepLabel: t(
                'pages.SellerAddFacilitiesImagesPage.sustainability'
              ),
              stepItemNode: (
                <SellerAddFacilitiesSustainabilityPage
                  initialValues={
                    facilityDraft[
                      Number(SellerAddFacilitiesSteps.Sustainability)
                    ] as SellerAddFacilitiesSustainabilityFormFields
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
                </SellerAddFacilitiesSustainabilityPage>
              ),
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.images'),
              stepItemNode: (
                <SellerAddFacilitiesImagesPage
                  initialValues={
                    facilityDraft[
                      Number(SellerAddFacilitiesSteps.Images)
                    ] as SellerAddFacilitiesImagesFormFields
                  }
                  submitHandler={async (values, resetForm) => {
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
                </SellerAddFacilitiesImagesPage>
              ),
            },
            {
              stepLabel: t('pages.SellerAddFacilitiesImagesPage.products'),
              stepItemNode: null,
            },
          ]}
        />
      </Grid>
    </StyledSellerAddFacilitiesPage>
  );
};

export default SellerAddFacilitiesPage;
