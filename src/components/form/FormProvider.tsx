import { ReactNode } from 'react';
import {
  FormProvider as RHFFormProvider,
  useForm,
  SubmitHandler,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema, InferType } from 'yup';

interface IFormProviderProps<T extends ObjectSchema<Record<string, unknown>>> {
  children: ReactNode;
  onSubmit?: SubmitHandler<InferType<T>>;
  validatorSchema: T;
}

const FormProvider = <T extends ObjectSchema<Record<string, unknown>>>({
  children,
  onSubmit,
  validatorSchema,
}: IFormProviderProps<T>) => {
  const methods = useForm<InferType<T>>({
    mode: 'onChange',
    resolver: yupResolver(validatorSchema),
  });

  return <RHFFormProvider {...methods}>{children}</RHFFormProvider>;
};

export default FormProvider;
