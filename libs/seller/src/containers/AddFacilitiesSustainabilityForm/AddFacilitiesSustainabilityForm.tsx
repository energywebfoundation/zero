import {
  GenericFormContainer,
  GenericFormFieldContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import Grid from '@material-ui/core/Grid';
import { useFilesControllerUploadFiles } from '@energyweb/zero-api-client';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Typography } from '@material-ui/core';
import { addFacilitiesSustainAbilityFormSchema } from './AddFacilitiesSustainabilityForm.schema';
import { addFacilitiesSustainabilityFormFields, IAddFacilitiesSustainabilityFormFields } from './AddFacilitiesSustainabilityForm.fields';
import { FormSectionCard } from '../../components';


export interface AddFacilitiesSustainabilityFormProps {
  initialValues: IAddFacilitiesSustainabilityFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<IAddFacilitiesSustainabilityFormFields>;
  children: ReactElement;
}

export function AddFacilitiesSustainabilityForm({
  submitHandler,
  initialValues,
  children,
}: AddFacilitiesSustainabilityFormProps) {
  const { mutateAsync, isLoading: isMutating } = useFilesControllerUploadFiles();
  const { t } = useTranslation();
  return (
      <GenericFormContainer
        submitHandler={submitHandler}
        validationSchema={addFacilitiesSustainAbilityFormSchema}
        initialValues={initialValues}
        fields={addFacilitiesSustainabilityFormFields}
      >
        <Grid container rowGap={'16px'}>
          <Grid item xs={12}>
            <FormSectionCard
              sectionHeader={t('forms.SellerAddFacilitiesSustainabilityForm.facilityStory')}
              helpText={t('forms.SellerAddFacilitiesSustainabilityForm.facilityStoryHelpText')}
            >
              <>
                <GenericFormFieldContainer
                  contentHeight
                  fieldName={'facilityStory'}
                />
                <Divider sx={{ width: '100%', my: 4 }} />
                <GenericFormFieldContainer
                  contentHeight
                  fieldName={'facilityDocumentList'}
                  isLoading={isMutating}
                  mutateUpload={mutateAsync}
                />
              </>
            </FormSectionCard>
          </Grid>
          <Grid item xs={12}>
            <FormSectionCard
              sectionHeader={t('forms.SellerAddFacilitiesSustainabilityForm.impactStory')}
              helpText={t('forms.SellerAddFacilitiesSustainabilityForm.impactStoryHelpText')}
              rememberText={t('forms.SellerAddFacilitiesSustainabilityForm.impactStoryRememberText')}
            >
              <>
                <GenericFormFieldContainer
                  contentHeight
                  fieldName={'impactStory'}
                />
                <Divider sx={{ width: "100%", my: 4 }} />
                <Typography fontWeight={700} fontSize="20px" color="primary">
                  {t('forms.SellerAddFacilitiesSustainabilityForm.sustainabilityDocuments')}
                </Typography>
                <GenericFormFieldContainer
                  contentHeight
                  fieldName={'sustainabilityDocumentList'}
                  isLoading={isMutating}
                  mutateUpload={mutateAsync}
                />
              </>
            </FormSectionCard>
          </Grid>
        </Grid>
        {children}
      </GenericFormContainer>
  );
}

export default AddFacilitiesSustainabilityForm;
