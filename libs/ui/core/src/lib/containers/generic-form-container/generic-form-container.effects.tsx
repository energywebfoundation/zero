import {
  useForm,
  UseFormRegister,
  Control,
  UseFormSetValue,
  FieldErrors,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BaseSyntheticEvent, useContext, useEffect, useRef } from 'react';
import { GenericFormContainerProps } from './generic-form-container';
import {
  FieldNamesMarkedBoolean,
  Mode,
  UseFormGetValues,
} from 'react-hook-form';
import { Observable, Subject } from 'rxjs';
import { GenericFormMultiStepContext } from '@energyweb/zero-ui';

type GenericFormEffectsProps<FormValuesType> = {
  mode?: Mode;
  subscribeValuesChanged$?: (values$: Observable<FormValuesType>) => void;
} & Pick<
  GenericFormContainerProps<FormValuesType>,
  'validationSchema' | 'initialValues' | 'submitHandler'
>;

export type TGenericFormEffectsReturnType<FormValuesType> = {
  register: UseFormRegister<FormValuesType>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit: (e?: BaseSyntheticEvent<object>) => Promise<void>;
  errors: FieldErrors;
  dirtyFields: FieldNamesMarkedBoolean<FormValuesType>;
  control: Control<FormValuesType>;
  isValid: boolean;
  isDirty: boolean;
  touchedFields: FieldNamesMarkedBoolean<FormValuesType>;
  isSubmitting: boolean;
  getValues: UseFormGetValues<FormValuesType>;
  setValue: UseFormSetValue<FormValuesType>;
};

type TGenericFormEffects = <FormValuesType>(
  props: GenericFormEffectsProps<FormValuesType>
) => TGenericFormEffectsReturnType<FormValuesType>;

export const useGenericFormEffects: TGenericFormEffects = ({
  validationSchema,
  initialValues,
  submitHandler,
  mode = 'onChange',
  subscribeValuesChanged$,
}) => {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
    setValue,
  } = useForm({
    mode,
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });
  const { errors, dirtyFields, isValid, isDirty, touchedFields, isSubmitting } =
    formState;

  const values = watch();
  const formValuesSubjectRef$ = useRef(new Subject());
  const genericFormMultistepContext = useContext(GenericFormMultiStepContext);

  const formValuesRef$ = useRef(formValuesSubjectRef$.current.asObservable());

  useEffect(() => {
    if (subscribeValuesChanged$) {
      subscribeValuesChanged$(formValuesRef$.current as any);
    }
  }, [subscribeValuesChanged$]);

  useEffect(() => {
    formValuesSubjectRef$.current.next(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => formValuesSubjectRef$.current.complete();
  }, [values]);

  const onSubmit = handleSubmit(async (values) => {
    submitHandler(values, reset)
      .then((res) => {
        console.log('submitHandler response', res);
        reset();
      })
      .catch((reason) => {
        console.log('request error', reason);
      });
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
  };
};
