import { SyntheticEvent, useState } from 'react';
import { FormSelectOption } from '../form-field-select';

export const useSelectAutocompleteEffects = (
  onChange: (...event: any[]) => void,
  maxValues: number | undefined
) => {
  const [textValue, setTextValue] = useState<string>('');

  const singleChangeHandler = (
    event: SyntheticEvent,
    selectedOption: FormSelectOption[] | FormSelectOption | null
  ) => {
    if (selectedOption) {
      const { value, label } = selectedOption as FormSelectOption;
      onChange(value);
      setTextValue(label);
    } else {
      onChange(null);
      setTextValue('');
    }
  };

  const multipleChangeHandler = (
    event: SyntheticEvent,
    selectedOptionList: FormSelectOption[] | FormSelectOption | null
  ) => {
    // eslint-disable-next-line lodash/prefer-lodash-method
    if (Array.isArray(selectedOptionList)) {
      onChange(
        selectedOptionList
          ? selectedOptionList.slice(0, maxValues ?? selectedOptionList.length)
          : selectedOptionList
      );
    }

    setTextValue('');
  };

  return {
    textValue,
    setTextValue,
    singleChangeHandler,
    multipleChangeHandler,
  };
};
