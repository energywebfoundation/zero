import {
  GenericFormCard,
  GenericFormContainer,
  GenericFormFieldContainer,
  TGenericFormSubmitHandlerFn
} from "@energyweb/zero-ui-core"
import { ReactElement } from "react"
import { AddProductsFormCard } from "../../components";
import {
  addFacilitiesProductsFormFields,
  IAddFacilitiesProductsFormFields
} from "./AddFacilitiesProductsForm.fields";
import { productsFieldValidationSchema } from "./AddFacilitiesProductsForm.schema";

export interface AddFacilitiesProductsFormProps {
  initialValues: IAddFacilitiesProductsFormFields;
  submitHandler: TGenericFormSubmitHandlerFn<IAddFacilitiesProductsFormFields>;
  children: ReactElement;
}

export const AddFacilitiesProductsForm = ({
  initialValues, submitHandler, children
}: AddFacilitiesProductsFormProps) => {
  return (
  <GenericFormContainer<IAddFacilitiesProductsFormFields>
    submitHandler={submitHandler}
    initialValues={initialValues}
    validationSchema={productsFieldValidationSchema}
    fields={addFacilitiesProductsFormFields}
  >
    <GenericFormCard>
      <GenericFormFieldContainer fieldName="products">
        <AddProductsFormCard />
      </GenericFormFieldContainer>
    </GenericFormCard>
    <>
      {children}
    </>
  </GenericFormContainer>
  )
}
