import { ReactNode } from "react";
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FormNestedFormContainer } from "../FornNestedFormContainer";
import { FormFieldNestedFormsConfig, useFormFieldNestedFormsEffects } from "./FormFieldNestedForms.effects";

export interface FormFieldNestedFormsProps<SingleFormValues = any> {
  field: FormFieldNestedFormsConfig<SingleFormValues>;
  register: UseFormRegister<FieldValues>;
  children: ReactNode;
};

export const FormFieldNestedForms = ({
  field, register, children
}: FormFieldNestedFormsProps) => {
  register(field.name);
  const {
    FieldHeading,
    AddFormButton,
    formIds,
    handleAddForm,
    handleFormRemove,
    handleUpdateForm
  } = useFormFieldNestedFormsEffects(field);
  return (
    <div>
      {FieldHeading ? <FieldHeading amountOfForms={formIds.length} /> : null}
      {formIds && formIds.length > 0 ?
      formIds.map(formId => (
        <FormNestedFormContainer
          key={formId}
          initialValues={field.initialValues}
          fields={field.nestedFields}
          validationSchema={field.validationSchema}
          mode={field.validationMode}
          handleFormRemove={() => handleFormRemove(formId)}
          handleUpdateForm={(formData) => handleUpdateForm(formId, formData)}
        >
          {children}
        </FormNestedFormContainer>
      )) : null}
      {AddFormButton
        ? <AddFormButton onClick={handleAddForm} />
        : <div>Please, provide addFormButton prop</div>
      }
    </div>
  )
}
