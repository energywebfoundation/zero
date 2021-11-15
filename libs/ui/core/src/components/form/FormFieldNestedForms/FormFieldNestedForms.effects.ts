import { FC, useContext, useState } from "react";
import { AnyObjectSchema } from "yup";
import { Mode, UnpackNestedValue } from 'react-hook-form';
import { FormFieldConfig, GenericFormFieldConfig } from "../../../containers";
import { GenericFormContext } from "../../../providers";

export type NestedFormState<FormValues> = {
  id: number;
  values: FormValues
}

export interface FormFieldNestedFormsConfig<SingleFormValues = any> extends Omit<GenericFormFieldConfig, 'autocomplete' | 'multiple' | 'maxValues'> {
  nestedFields: FormFieldConfig[];
  initialValues: SingleFormValues;
  validationSchema: AnyObjectSchema;
  addFormButton: FC<{ onClick: () => void }>;
  validationMode?: Mode;
  heading?: FC<{ amountOfForms?: number }>;
}

export const useFormFieldNestedFormsEffects = (field: FormFieldNestedFormsConfig) => {
  const { setValue, getValues } = useContext(GenericFormContext)!;
  const initialValue: NestedFormState<Record<string, any>>[] = getValues(field.name);
  const [formIds, setFormIds] = useState<number[]>([initialValue[0].id]);

  const AddFormButton = field.addFormButton;
  const FieldHeading = field.heading;

  const handleAddForm = () => {
    const formValues: NestedFormState<Record<string, any>>[] = getValues(field.name);
    const id = Date.now();
    setFormIds([...formIds, id]);
    setValue(field.name, [...formValues, {id, values: field.initialValues}])
  };

  const handleFormRemove = (id: number) => {
    if(formIds.length === 1) return;
    
    const formValues: NestedFormState<Record<string, any>>[] = getValues(field.name);
    const filteredFormIds = formIds.filter(formId => formId !== id);
    const filteredForms = formValues.filter(form => form.id !== id);
    setFormIds(filteredFormIds);
    setValue(field.name, filteredForms);
  };

  const handleUpdateForm = <FormValues>(id: number, formData: UnpackNestedValue<FormValues>) => {
    const formValues: NestedFormState<FormValues>[] = getValues(field.name);
    const editedValues = formValues.map(form => form.id === id ? { ...form, values: formData } : form);
    setValue(field.name, editedValues);
  };

  if (!field.validationSchema) {
    console.error('Please, provide validationSchema for nested fields as field.validationSchema')
  }

  return {
    AddFormButton,
    FieldHeading,
    formIds,
    handleAddForm,
    handleFormRemove,
    handleUpdateForm
  }
}
