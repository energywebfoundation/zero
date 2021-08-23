import {
  DeepMap,
  FieldError,
  useForm,
  UseFormRegister,
  Control,
  UseFormSetValue,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BaseSyntheticEvent, useEffect, useRef } from 'react';
import { GenericFormContainerProps } from './generic-form-container';
import {
  FieldNamesMarkedBoolean,
  Mode,
  UseFormGetValues,
} from 'react-hook-form';
import { Observable, Subject } from 'rxjs';

type GenericFormEffectsProps<FormValuesType> = {
  mode?: Mode;
  handleValuesChanged$?: (values$: Observable<FormValuesType>) => void;
} & Pick<
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
  setValue: UseFormSetValue<FormValuesType>;
};

type TGenericFormEffects = <FormValuesType>(
  props: GenericFormEffectsProps<FormValuesType>
) => TGenericFormEffectsReturnType<FormValuesType>;

export const useGenericFormEffects: TGenericFormEffects = ({
  validationSchema,
  initialValues,
  submitHandler,
  mode = 'onBlur',
  handleValuesChanged$,
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

  const formValuesSubjectRef$ = useRef(new Subject());
  const formValuesRef$ = useRef(formValuesSubjectRef$.current.asObservable());

  const values = watch();
  useEffect(() => {
    formValuesSubjectRef$.current.next(values);
    if (handleValuesChanged$) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      handleValuesChanged$(formValuesRef$);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => formValuesSubjectRef$.current.complete();
  }, [values]);

  const onSubmit = handleSubmit(async (values) => {
    submitHandler(values, reset)
      .then((res) => {
        console.log(res);
        reset();
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
    setValue,
  };
};
