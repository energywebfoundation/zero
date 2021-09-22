import { useState } from 'react';

export const useGenericFormMultiStepContextProviderEffects = () => {
  const [isActiveStepValid, setIsActiveStepValid] = useState(true);
  const [isActiveStepDirty, setIsActiveStepDirty] = useState(false);
  return {
    isActiveStepValid,
    setIsActiveStepValid,
    isActiveStepDirty,
    setIsActiveStepDirty,
  };
};
