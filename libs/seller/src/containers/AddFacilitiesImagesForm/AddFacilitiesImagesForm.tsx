import {
  GenericFormContainer,
  TGenericFormSubmitHandlerFn,
  GenericFormCard,
  GenericFormFieldContainer,
} from '@energyweb/zero-ui-core';
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
      <GenericFormFieldContainer
        contentHeight
        fieldName={'facilityImageList'}
      />
    </GenericFormCard>
    <>
      <ImageListContainer fieldName={'facilityImageList'} />
      {children}
    </>
  </GenericFormContainer>
);
