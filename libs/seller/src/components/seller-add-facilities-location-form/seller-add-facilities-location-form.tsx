import {
  GenericFormContainer,
  GenericFormFieldContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import { Grid } from '@material-ui/core';
import { ReactElement } from 'react';

import { SellerAddFacilitiesLocationFormFields } from '../../pages/seller-add-facilities-location-page/seller-add-facilities-location-page';
import { sellerAddFacilitiesLocationFormFields } from './seller-add-facilities-location-form-fields';
import { sellerAddFacilitiesLocationFormSchema } from './seller-add-facilities-location-form.schema';
export interface SellerAddFacilitiesLocationFormProps {
  initialValues: SellerAddFacilitiesLocationFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesLocationFormFields>;
  children: ReactElement;
}

export const SellerAddFacilitiesLocationForm = ({
  submitHandler,
  initialValues,
  children,
}: SellerAddFacilitiesLocationFormProps) => (
    <GenericFormContainer<SellerAddFacilitiesLocationFormFields>
      submitHandler={submitHandler}
      validationSchema={sellerAddFacilitiesLocationFormSchema}
      initialValues={initialValues}
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
      {children}
    </GenericFormContainer>
);

export default SellerAddFacilitiesLocationForm;
