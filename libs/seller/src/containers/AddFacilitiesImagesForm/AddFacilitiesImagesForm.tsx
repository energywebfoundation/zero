import {
  GenericFormContainer,
  TGenericFormSubmitHandlerFn,
  GenericFormCard,
  GenericFormFieldContainer,
} from '@energyweb/zero-ui-core';
import { Box, Grid, Paper } from '@material-ui/core';
import { ReactElement } from 'react';
import { addFacilitiesImagesFormSchema } from './AddFacilitiesImagesForm.schema';
import { addFacilitiesImagesFormFields, IAddFacilitiesImagesFormFields } from './AddFacilitiesImagesForm.fields';
import { ImageListContainer } from '../../components';

export interface AddFacilitiesImagesFormProps {
  initialValues: IAddFacilitiesImagesFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<IAddFacilitiesImagesFormFields>;
  children: ReactElement;
}

export const AddFacilitiesImagesForm = ({
  submitHandler,
  initialValues,
  children,
}: AddFacilitiesImagesFormProps) => (
  <GenericFormContainer<IAddFacilitiesImagesFormFields>
    submitHandler={submitHandler}
    validationSchema={addFacilitiesImagesFormSchema}
    initialValues={initialValues}
    fields={addFacilitiesImagesFormFields}
  >
    <GenericFormCard>
      <Grid container>
        <Grid item xs={12}>
          <GenericFormFieldContainer
            contentHeight
            fieldName={'facilityImageList'}
          />
        </Grid>
      </Grid>
    </GenericFormCard>
    <>
      <Box my={2}>
        <Paper sx={{ p: 3 }}>
          <ImageListContainer imageList={initialValues.facilityImageList} />
        </Paper>
      </Box>
      {children}
    </>
  </GenericFormContainer>
);
