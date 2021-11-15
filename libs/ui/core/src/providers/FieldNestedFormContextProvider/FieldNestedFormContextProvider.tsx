import { DeepMap, DeepPartial, FieldError, UseFormReturn } from 'react-hook-form';
import { ReactNode, ReactNodeArray, createContext } from 'react';
import { GenericFormFieldConfig } from '../../containers';

export type NestedFormContextData<FormValues = any> = Omit<UseFormReturn<FormValues>, 'formState'> & {
  fields: GenericFormFieldConfig[];
  isDirty: boolean;
  isValid: boolean;
  dirtyFields: DeepMap<DeepPartial<FormValues>, true>;
  errors: DeepMap<DeepPartial<FormValues>, FieldError>;
  handleFormRemove: () => void;
  inputsVariant?: 'standard' | 'outlined' | 'filled';
}

export interface FieldNestedFormProviderProps<T = NestedFormContextData> {
  formConfig: T;
  children: ReactNode | ReactNodeArray;
}

export const FieldNestedFormContext = createContext<NestedFormContextData | null>(
  null
);

export const FieldNestedFormContextProvider = ({
  children,
  formConfig,
}: FieldNestedFormProviderProps) => (
  <FieldNestedFormContext.Provider value={formConfig}>
    {children}
  </FieldNestedFormContext.Provider>
);
