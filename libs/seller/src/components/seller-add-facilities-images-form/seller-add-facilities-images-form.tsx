import {
  GenericFormContainer,
  TGenericFormSubmitHandlerFn,
  GenericFormCard,
  GenericFormFieldContainer,
} from '@energyweb/zero-ui-core';
import { Grid } from '@material-ui/core';
import { ReactElement } from 'react';
import { sellerAddFacilitiesImagesFormSchema } from './seller-add-facilities-images-form.schema';
import { sellerAddFacilitiesImagesFormFields } from './seller-add-facilities-images-form-fields';

export interface SellerAddFacilitiesImagesFormProps {
  initialValues: SellerAddFacilitiesImagesFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesImagesFormFields>;
  children: ReactElement;
}
export interface SellerAddFacilitiesImagesFormFields {
  facilityImageList: string[];
}

export const SellerAddFacilitiesImagesForm = ({
  submitHandler,
  initialValues,
  children,
}: SellerAddFacilitiesImagesFormProps) => (
  <div>
    <GenericFormCard>
      <GenericFormContainer<SellerAddFacilitiesImagesFormFields>
        submitHandler={submitHandler}
        validationSchema={sellerAddFacilitiesImagesFormSchema}
        initialValues={initialValues}
        fields={sellerAddFacilitiesImagesFormFields}
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

export default SellerAddFacilitiesImagesForm;
