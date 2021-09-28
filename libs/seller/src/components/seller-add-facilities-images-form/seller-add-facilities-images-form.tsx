import styled from '@emotion/styled';
import {
  GenericFormContainer,
  TGenericFormSubmitHandlerFn,
  GenericFormCard,
  GenericFormFieldContainer,
} from '@energyweb/zero-ui-core';
import { sellerAddFacilitiesImagesFormSchema } from './seller-add-facilities-images-form.schema';
import { sellerAddFacilitiesImagesFormFields } from './seller-add-facilities-images-form-fields';
import { Grid } from '@material-ui/core';
import { ReactElement } from 'react';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesImagesFormProps {
  initialValues: SellerAddFacilitiesImagesFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesImagesFormFields>;
  children: ReactElement;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SellerAddFacilitiesImagesFormFields {
  facilityImageList: string[];
}

const StyledSellerAddFacilitiesImagesForm = styled.div``;

export const SellerAddFacilitiesImagesForm = ({
  submitHandler,
  initialValues,
  children,
}: SellerAddFacilitiesImagesFormProps) => (
  <StyledSellerAddFacilitiesImagesForm>
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
  </StyledSellerAddFacilitiesImagesForm>
);

export default SellerAddFacilitiesImagesForm;
