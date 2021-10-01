import {
  GenericFormContainer,
  GenericFormFieldContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import { Grid } from '@material-ui/core';
import { ReactElement } from 'react';
import { IAddFacilitiesLocationFormFields, addFacilitiesLocationFormFields } from './AddFacilitiesLocationForm.fields';
import { addFacilitiesLocationFormSchema } from './AddFacilitiesLocationForm.schema';

export interface AddFacilitiesLocationFormProps {
  initialValues: IAddFacilitiesLocationFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<IAddFacilitiesLocationFormFields>;
  children: ReactElement;
}

export const AddFacilitiesLocationForm = ({
  submitHandler,
  initialValues,
  children,
}: AddFacilitiesLocationFormProps) => (
    <GenericFormContainer<IAddFacilitiesLocationFormFields>
      submitHandler={submitHandler}
      validationSchema={addFacilitiesLocationFormSchema}
      initialValues={initialValues}
      fields={addFacilitiesLocationFormFields}
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
