import {
  DeepMap,
  FieldError,
  useForm,
  UseFormRegister,
  Control,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BaseSyntheticEvent } from 'react';
import { GenericFormContainerProps } from './generic-form-container';
import {
  FieldNamesMarkedBoolean,
  Mode,
  UseFormGetValues,
} from 'react-hook-form';

type GenericFormEffectsProps<FormValuesType> = { mode?: Mode } & Pick<
  GenericFormContainerProps<FormValuesType>,
  'validationSchema' | 'initialValues' | 'submitHandler'
>;

export type TGenericFormEffectsReturnType<FormValuesType> = {
  register: UseFormRegister<FormValuesType>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  errors: DeepMap<FormValuesType, FieldError>;
  dirtyFields: DeepMap<FormValuesType, true>;
  control: Control<FormValuesType>;
  isValid: boolean;
  isDirty: boolean;
  touchedFields: FieldNamesMarkedBoolean<FormValuesType>;
  isSubmitting: boolean;
  getValues: UseFormGetValues<FormValuesType>;
};

type TGenericFormEffects = <FormValuesType>(
  props: GenericFormEffectsProps<FormValuesType>
) => TGenericFormEffectsReturnType<FormValuesType>;

export const useGenericFormEffects: TGenericFormEffects = ({
  validationSchema,
  initialValues,
  submitHandler,
  mode = 'onBlur',
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
  } = useForm({
    mode,
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });
  const {
    errors,
    dirtyFields,
    isValid,
    isDirty,
    touchedFields,
    isSubmitting,
  } = formState;

  const onSubmit = handleSubmit(async (values) => {
    submitHandler(values, reset)
      .then((res) => {
        console.log(res);
      })
      .catch((reason) => {
        console.log('request error', reason);
      });
  });

  return {
    control,
    register,
    onSubmit,
    errors,
    isValid,
    isDirty,
    dirtyFields,
    touchedFields,
    isSubmitting,
    getValues,
  };
};
