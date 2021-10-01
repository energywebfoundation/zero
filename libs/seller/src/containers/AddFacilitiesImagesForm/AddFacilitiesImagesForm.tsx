import {
  GenericFormContainer,
  TGenericFormSubmitHandlerFn,
  GenericFormCard,
  GenericFormFieldContainer,
} from '@energyweb/zero-ui-core';
import { Grid } from '@material-ui/core';
import { ReactElement } from 'react';
import { addFacilitiesImagesFormSchema } from './AddFacilitiesImagesForm.schema';
import { addFacilitiesImagesFormFields, IAddFacilitiesImagesFormFields } from './AddFacilitiesImagesForm.fields';

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
  <div>
    <GenericFormCard>
      <GenericFormContainer<IAddFacilitiesImagesFormFields>
        submitHandler={submitHandler}
        validationSchema={addFacilitiesImagesFormSchema}
        initialValues={initialValues}
        fields={addFacilitiesImagesFormFields}
      >
        <Grid container>
          <Grid item xs={12}>
            <GenericFormFieldContainer
              contentHeight
              fieldName={'facilityImageList'}
            />
          </Grid>
        </Grid>
      </GenericFormContainer>
    </GenericFormCard>
    {children}
  </div>
);
