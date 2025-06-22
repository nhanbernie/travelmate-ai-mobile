import { useFormContext, FieldValues } from 'react-hook-form';

/**
 * Custom hook để handle form submission trong React Native
 * Thay thế cho <form onSubmit> của web
 */
export const useFormSubmit = <T extends FieldValues = FieldValues>() => {
  const { handleSubmit, formState } = useFormContext<T>();

  return {
    /**
     * Gọi hàm này khi user nhấn submit button
     * @param onSubmit - Function xử lý data khi form valid
     */
    submitForm: (onSubmit: (data: T) => void) => () => handleSubmit(onSubmit)(),

    /**
     * Form state để kiểm tra validation
     */
    isValid: formState.isValid,
    isSubmitting: formState.isSubmitting,
    errors: formState.errors,
    isDirty: formState.isDirty,
  };
};
