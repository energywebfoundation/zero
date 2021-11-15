import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import { DeepPartial, Mode, UnpackNestedValue, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AnyObjectSchema } from 'yup';
import { FormFieldConfig } from "../../../containers";
import { FieldNestedFormContextProvider, NestedFormContextData } from "../../../providers";

export interface FormNestedFormContainerProps<FormValuesType> {
  initialValues: UnpackNestedValue<DeepPartial<FormValuesType>>;
  fields: FormFieldConfig[];
  validationSchema: AnyObjectSchema;
  children: ReactNode;
  handleUpdateForm: (formData: UnpackNestedValue<FormValuesType>) => void;
  handleFormRemove: () => void;
  mode?: Mode;
}

export type TFormNestedFormContainer = <FormValuesType>(
  props: PropsWithChildren<FormNestedFormContainerProps<FormValuesType>>
) => ReactElement;

export const FormNestedFormContainer: TFormNestedFormContainer = ({
  fields,
  initialValues,
  validationSchema,
  children,
  handleFormRemove,
  handleUpdateForm,
  mode = 'onBlur'
}) => {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode
  });
  const formConfig = { ...form, formState: undefined };
  const { isDirty, errors, dirtyFields, isValid } = form.formState;
  const formContext = {
    ...formConfig,
    isDirty,
    errors,
    dirtyFields,
    isValid,
    fields: fields.map((field) => ({
      ...field,
      label: field.label ? t(field.label) : null,
      placeholderText: field.label ? t(field.placeholderText ?? '') : null
    })),
    handleFormRemove,
  } as NestedFormContextData;
  const watch = form.watch;
  const formValues = watch();
  handleUpdateForm(formValues);
  return (
    <FieldNestedFormContextProvider formConfig={formContext}>
      {children}
    </FieldNestedFormContextProvider>
  )
}
