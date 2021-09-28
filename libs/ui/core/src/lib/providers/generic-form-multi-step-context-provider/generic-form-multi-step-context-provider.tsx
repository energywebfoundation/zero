import { createContext, ReactElement } from 'react';
import { useGenericFormMultiStepContextProviderEffects } from './generic-form-multi-step-context-provider.effects';

/* eslint-disable-next-line */
export interface GenericFormMultiStepContextProviderProps {
  children: ReactElement;
}

export const GenericFormMultiStepContext = createContext<{
  isActiveStepValid: boolean;
  isActiveStepDirty: boolean;
  handleActiveStepIsValidChange: (isFormValid: boolean) => void;
  handleActiveStepIsDirtyChange: (isFormDirty: boolean) => void;
} | null>(null);

export const GenericFormMultiStepContextProvider = ({
  children,
}: GenericFormMultiStepContextProviderProps) => {
  const {
    setIsActiveStepValid,
    setIsActiveStepDirty,
    isActiveStepValid,
    isActiveStepDirty,
  } = useGenericFormMultiStepContextProviderEffects();
  return (
    <GenericFormMultiStepContext.Provider
      value={{
        isActiveStepDirty,
        isActiveStepValid,
        handleActiveStepIsValidChange: (isFormValid) =>
          setIsActiveStepValid(isFormValid),
        handleActiveStepIsDirtyChange: (isFormValid) =>
          setIsActiveStepDirty(isFormValid),
      }}
      children={children}
    />
  );
};

export default GenericFormMultiStepContextProvider;
