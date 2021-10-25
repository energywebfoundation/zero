import {
  useForm,
  UseFormRegister,
  Control,
  UseFormSetValue,
  FieldErrors,
  UseFormWatch,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BaseSyntheticEvent, useContext, useEffect } from 'react';
import {
  FieldNamesMarkedBoolean,
  UseFormGetValues,
} from 'react-hook-form';
import { GenericFormMultiStepContext } from '../../providers';
import { GenericFormContainerProps } from './GenericFormContainer';

type GenericFormEffectsProps<FormValuesType> = Pick<
  GenericFormContainerProps<FormValuesType>,
  'validationSchema' | 'initialValues' | 'submitHandler' | 'validationMode'
>;

export type TGenericFormEffectsReturnType<FormValuesType> = {
  register: UseFormRegister<FormValuesType>;
  onSubmit: (e?: BaseSyntheticEvent<Record<string, any>>) => Promise<void>;
  errors: FieldErrors;
  dirtyFields: FieldNamesMarkedBoolean<FormValuesType>;
  control: Control<FormValuesType>;
  isValid: boolean;
  isDirty: boolean;
  touchedFields: FieldNamesMarkedBoolean<FormValuesType>;
  isSubmitting: boolean;
  getValues: UseFormGetValues<FormValuesType>;
  setValue: UseFormSetValue<FormValuesType>;
  watch: UseFormWatch<FormValuesType>;
};

type TGenericFormEffects = <FormValuesType>(
  props: GenericFormEffectsProps<FormValuesType>
) => TGenericFormEffectsReturnType<FormValuesType>;

export const useGenericFormEffects: TGenericFormEffects = ({
  validationSchema,
  initialValues,
  submitHandler,
  validationMode = 'onChange',
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
    setValue,
    watch
  } = useForm({
    mode: validationMode,
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });
  const { errors, dirtyFields, isValid, isDirty, touchedFields, isSubmitting } =
    formState;

  const genericFormMultistepContext = useContext(GenericFormMultiStepContext);

  const onSubmit = handleSubmit(async (values) => {
    submitHandler(values, reset)
  });

  useEffect(() => {
    genericFormMultistepContext?.handleActiveStepIsDirtyChange(isDirty);
  }, [isDirty]);

  useEffect(() => {
    genericFormMultistepContext?.handleActiveStepIsValidChange(isValid);
  }, [isValid]);

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
    setValue,
    watch
  };
};
