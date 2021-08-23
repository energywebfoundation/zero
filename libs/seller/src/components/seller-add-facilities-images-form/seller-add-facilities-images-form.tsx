import styled from '@emotion/styled';
import {
  GenericFormContainer,
  TGenericFormSubmitHandlerFn,
  GenericFormCard,
  GenericFormFieldContainer,
} from '@energyweb/zero-ui';
import { sellerAddFacilitiesImagesFormSchema } from './seller-add-facilities-images-form.schema';
import { sellerAddFacilitiesImagesFormFields } from './seller-add-facilities-images-form-fields';
import { Grid } from '@material-ui/core';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesImagesFormProps {
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesImagesFormFields>;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SellerAddFacilitiesImagesFormFields {
  facilityImageList: string[];
}

const StyledSellerAddFacilitiesImagesForm = styled.div``;

export function SellerAddFacilitiesImagesForm({
  submitHandler,
}: SellerAddFacilitiesImagesFormProps) {
  return (
    <StyledSellerAddFacilitiesImagesForm>
      <GenericFormCard>
        <GenericFormContainer<SellerAddFacilitiesImagesFormFields>
          submitHandler={submitHandler}
          validationSchema={sellerAddFacilitiesImagesFormSchema}
          initialValues={{ facilityImageList: [] }}
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
    </StyledSellerAddFacilitiesImagesForm>
  );
}

export default SellerAddFacilitiesImagesForm;
