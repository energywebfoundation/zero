import {
  GenericFormCard,
  GenericFormContainer,
  GenericFormFieldContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui-core';
import { Box, Grid } from '@material-ui/core';
import { ReactElement } from 'react';
import { addFacilitiesBasicInformationFormSchema } from './AddFacilitiesBasicInformationForm.schema';
import {
  IAddFacilitiesBasicInformationFormFields,
  addFacilitiesBasicInformationFormFields,
} from './AddFacilitiesBasicInformationForm.fields';

export interface AddFacilitiesBasicInformationFormProps {
  submitHandler: TGenericFormSubmitHandlerFn<IAddFacilitiesBasicInformationFormFields>;
  initialFormValues: IAddFacilitiesBasicInformationFormFields;
  children: ReactElement;
}

export const AddFacilitiesBasicInformationForm = ({
  submitHandler,
  initialFormValues,
  children,
}: AddFacilitiesBasicInformationFormProps) => (
  <GenericFormCard>
    <GenericFormContainer<IAddFacilitiesBasicInformationFormFields>
      submitHandler={submitHandler}
      validationSchema={addFacilitiesBasicInformationFormSchema}
      initialValues={initialFormValues}
      fields={addFacilitiesBasicInformationFormFields}
    >
      <Grid container spacing={'20px'}>
        <Grid item sm={6}>
          <GenericFormFieldContainer fieldName={'deviceOwner'} />
          <GenericFormFieldContainer fieldName={'eacRegistries'} />
          <GenericFormFieldContainer fieldName={'source'} />
        </Grid>
        <Grid item sm={6}>
          <GenericFormFieldContainer fieldName={'facilityName'} />
          <GenericFormFieldContainer fieldName={'registryId'} />
          <GenericFormFieldContainer fieldName={'deviceOwnership'} />
        </Grid>
        <Grid item sm={6}>
          <Box display={'flex'}>
            <Box mr={'8px'} flexGrow={1}>
              <GenericFormFieldContainer
                fullWidth
                fieldName={'installedCapacity'}
              />
            </Box>
            <GenericFormFieldContainer
              boxWidth={'90px'}
              fieldName={'capacityUnit'}
            />
          </Box>
          <Box>
            <GenericFormFieldContainer
              fieldName={'projectSupportedFinancially'}
            />
          </Box>
        </Grid>
        <Grid item sm={6}>
          <GenericFormFieldContainer fieldName={'commercialOperationDate'} />
          <GenericFormFieldContainer fieldName={'typeOfFinancialSupport'} />
        </Grid>
      </Grid>
      {children}
    </GenericFormContainer>
  </GenericFormCard>
);
