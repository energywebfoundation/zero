import {
  DeepMap,
  FieldError,
  useForm,
  UseFormRegister,
  Control,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GenericFormProps } from './GenericForm.types';
import { BaseSyntheticEvent } from 'react';
import { keys } from 'lodash/fp';

type GenericFormEffectsProps<FormValuesType> = Pick<
  GenericFormProps<FormValuesType>,
  'validationSchema' | 'initialValues' | 'submitHandler'
>;

type GenericFormEffectsReturnType<FormValuesType> = {
  register: UseFormRegister<FormValuesType>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit: (e?: BaseSyntheticEvent<object, any, any>) => Promise<void>;
  errors: DeepMap<FormValuesType, FieldError>;
  buttonDisabled: boolean;
  dirtyFields: DeepMap<FormValuesType, true>;
  control: Control<FormValuesType>;
};

type TGenericFormEffects = <FormValuesType>(
  props: GenericFormEffectsProps<FormValuesType>
) => GenericFormEffectsReturnType<FormValuesType>;

export const useGenericFormEffects: TGenericFormEffects = ({
  validationSchema,
  initialValues,
  submitHandler,
}) => {
  const { control, register, handleSubmit, formState, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });
  const { isValid, errors, dirtyFields, isDirty } = formState;

  const onSubmit = handleSubmit(async (values) => {
    await submitHandler(values, reset);
  });

  const buttonDisabled = !isValid || !isDirty;

  return { control, register, onSubmit, errors, buttonDisabled, dirtyFields };
};
