import styled from '@emotion/styled';
import {
  FormSectionCard,
  GenericFormContainer,
  GenericFormFieldContainer,
  TGenericFormSubmitHandlerFn,
} from '@energyweb/zero-ui';
import { SellerAddFacilitiesSustainabilityFormFields } from '../../pages/seller-add-facilities-sustainability-page/seller-add-facilities-sustainability-page';
import { sellerAddFacilitiesSustainAbilityFormSchema } from './seller-add-facilities-sustainability-form.schema';
import { sellerAddFacilitiesSustainabilityFormFields } from './seller-add-facilities-sustainability-form-fields';
import Grid from '@material-ui/core/Grid';

/* eslint-disable-next-line */
export interface SellerAddFacilitiesSustainabilityFormProps {
  initialValues: SellerAddFacilitiesSustainabilityFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<SellerAddFacilitiesSustainabilityFormFields>;
}

const StyledSellerAddFacilitiesSustainabilityForm = styled.div``;

export function SellerAddFacilitiesSustainabilityForm({
  submitHandler,
  initialValues,
}: SellerAddFacilitiesSustainabilityFormProps) {
  return (
    <StyledSellerAddFacilitiesSustainabilityForm>
      <GenericFormContainer
        submitHandler={submitHandler}
        validationSchema={sellerAddFacilitiesSustainAbilityFormSchema}
        initialValues={initialValues}
        fields={sellerAddFacilitiesSustainabilityFormFields}
      >
        <Grid container rowGap={'16px'}>
          <Grid item xs={12}>
            <FormSectionCard
              sectionHeader={'Facility story'}
              sectionSubHeader={''}
              helpText={
                'Some users want to quickly read the story of your facility without having to parse all the numeric information. This is different than the impact story. See an example of a facility story'
              }
            >
              <GenericFormFieldContainer
                contentHeight
                fieldName={'facilityStory'}
              />
            </FormSectionCard>
          </Grid>
          <Grid item xs={12}>
            <FormSectionCard
              sectionHeader={'Sustainability'}
              sectionSubHeader={'Green labels'}
              helpText={`TIP: 90% of buyers are looking for products that have green labels. Labels represent a choosing shortcut for them.
              You will have to provide document proofs about each label or it won’t be displayed in the product page.`}
            >
              <GenericFormFieldContainer
                contentHeight
                fieldName={'greenLabelList'}
              />
            </FormSectionCard>
          </Grid>
          <Grid item xs={12}>
            <FormSectionCard
              sectionHeader={'Facility documents'}
              sectionSubHeader={''}
            >
              <GenericFormFieldContainer
                contentHeight
                fieldName={'facilityDocuments'}
              />
            </FormSectionCard>
          </Grid>
          <Grid item xs={12}>
            <FormSectionCard
              sectionHeader={'Impact story'}
              sectionSubHeader={''}
              helpText={`help your users by giving a brief description of the additional impact that you can provide. See an example of an impact story.`}
              rememberText={
                'you should upload document proofs of your sustainability claims'
              }
            >
              <GenericFormFieldContainer
                contentHeight
                fieldName={'impactStory'}
              />
            </FormSectionCard>
          </Grid>
          <Grid item xs={12}>
            <FormSectionCard sectionHeader={'Sustainability documents'}>
              <GenericFormFieldContainer
                contentHeight
                fieldName={'sustainabilityDocuments'}
              />
            </FormSectionCard>
          </Grid>
        </Grid>
      </GenericFormContainer>
    </StyledSellerAddFacilitiesSustainabilityForm>
  );
}

export default SellerAddFacilitiesSustainabilityForm;