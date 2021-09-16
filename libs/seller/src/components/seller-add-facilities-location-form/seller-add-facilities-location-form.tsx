import styled from '@emotion/styled';
import {
  GenericFormContainer,
  GenericFormFieldContainer,
  GenericMap,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui';
import { SellerAddFacilitiesLocationFormFields } from '../../pages/seller-add-facilities-location-page/seller-add-facilities-location-page';
import { sellerAddFacilitiesLocationFormFields } from './seller-add-facilities-location-form-fields';
import { sellerAddFacilitiesLocationFormSchema } from './seller-add-facilities-location-form.schema';
import { Grid } from '@material-ui/core';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesLocationFormProps {
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesLocationFormFields>;
}

const StyledSellerAddFacilitiesLocationForm = styled.div``;

export function SellerAddFacilitiesLocationForm({
  submitHandler,
}: SellerAddFacilitiesLocationFormProps) {
  return (
    <StyledSellerAddFacilitiesLocationForm>
      <GenericFormContainer<SellerAddFacilitiesLocationFormFields>
        submitHandler={submitHandler}
        subscribeValuesChanged$={(values$) => {
          values$.subscribe(console.log);
        }}
        validationSchema={sellerAddFacilitiesLocationFormSchema}
        initialValues={{
          country: '',
          region: '',
          address: '',
          gridOperator: '',
          latitude: '47.166168',
          longitude: '8.515495',
        }}
        fields={sellerAddFacilitiesLocationFormFields}
      >
        <Grid container spacing={'20px'}>
          <Grid item xs={12} sm={6}>
            <GenericFormFieldContainer fieldName={'country'} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <GenericFormFieldContainer fieldName={'region'} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <GenericFormFieldContainer fieldName={'gridOperator'} />
          </Grid>
          <Grid item xs={12}>
            <GenericFormFieldContainer fieldName={'address'} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <GenericFormFieldContainer fieldName={'latitude'} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <GenericFormFieldContainer fieldName={'longitude'} />
          </Grid>
        </Grid>
        <Grid container mt={'20px'}>
          <Grid item xs={12}>
            <GenericFormFieldContainer fieldName={'map'} />
          </Grid>
        </Grid>
      </GenericFormContainer>
    </StyledSellerAddFacilitiesLocationForm>
  );
}

export default SellerAddFacilitiesLocationForm;
