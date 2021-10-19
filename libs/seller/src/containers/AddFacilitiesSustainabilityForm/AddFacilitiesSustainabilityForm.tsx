import {
  FormSectionCard,
  GenericFormContainer,
  GenericFormFieldContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import Grid from '@material-ui/core/Grid';
import { useFilesControllerDeleteFile, useFilesControllerUploadFiles } from '@energyweb/zero-api-client';
import { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Divider, Typography } from '@material-ui/core';
import { addFacilitiesSustainAbilityFormSchema } from './AddFacilitiesSustainabilityForm.schema';
import { addFacilitiesSustainabilityFormFields, IAddFacilitiesSustainabilityFormFields } from './AddFacilitiesSustainabilityForm.fields';

const SubHeader = styled(Typography)`
  font-weight: 700;
`;

const HelperText = styled(Typography)`
  font-weight: 500
`

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
  const { t } = useTranslation();

  const { mutateAsync: addFileAsync, isLoading: isMutating } = useFilesControllerUploadFiles();
  const { mutate: removeFile } = useFilesControllerDeleteFile();

  const fields = useMemo(
    () => addFacilitiesSustainabilityFormFields(addFileAsync, removeFile),
    [addFileAsync, removeFile]
  );

  return (
      <GenericFormContainer
        submitHandler={submitHandler}
        validationSchema={addFacilitiesSustainAbilityFormSchema}
        initialValues={initialValues}
        fields={fields}
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
                <Divider sx={{ width: '100%', my: 3 }} />
                <GenericFormFieldContainer
                  contentHeight
                  fieldName={'facilityDocumentList'}
                  isLoading={isMutating}
                  mutateUpload={addFileAsync}
                />
              </>
            </FormSectionCard>
          </Grid>
          <Grid item xs={12}>
            <FormSectionCard
              sectionHeader={t('forms.SellerAddFacilitiesSustainabilityForm.sustainability')}
            >
              <>
                <SubHeader color="primary">
                  {t('forms.SellerAddFacilitiesSustainabilityForm.greenLabels')}
                </SubHeader>
                <HelperText color="primary">
                  {t('forms.SellerAddFacilitiesSustainabilityForm.greenLabelsHelperText1')}
                </HelperText>
                <HelperText color="primary">
                  {t('forms.SellerAddFacilitiesSustainabilityForm.greenLabelsHelperText2')}
                </HelperText>
                <GenericFormFieldContainer
                  fieldName="greenLabel"
                  isLoading={isMutating}
                />
                <Divider sx={{ width: "100%", my: 3 }} />

                <SubHeader color="primary">
                  {t('forms.SellerAddFacilitiesSustainabilityForm.impactStory')}
                </SubHeader>
                <HelperText color="primary">
                  {t('forms.SellerAddFacilitiesSustainabilityForm.impactStoryHelpText')}
                </HelperText>
                <SubHeader color="primary">
                  {t('forms.SellerAddFacilitiesSustainabilityForm.impactStoryRememberText')}
                </SubHeader>
                <GenericFormFieldContainer fieldName={'impactStory'} />
                <Divider sx={{ width: "100%", my: 3 }} />

                <Typography fontWeight={700} fontSize="20px" color="primary">
                  {t('forms.SellerAddFacilitiesSustainabilityForm.sustainabilityDocuments')}
                </Typography>
                <GenericFormFieldContainer
                  fieldName={'sustainabilityDocumentList'}
                  isLoading={isMutating}
                  mutateUpload={addFileAsync}
                />
              </>
            </FormSectionCard>
          </Grid>
        </Grid>
        {children}
      </GenericFormContainer>
  );
}
