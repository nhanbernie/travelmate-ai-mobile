import { useCallback } from 'react';
import { showToast, ToastConfig } from '@/services/toast/toastService';

/**
 * Custom hook for using toast notifications
 * Provides convenient methods for showing different types of toasts
 */
export const useToast = () => {
  const success = useCallback(
    (title: string, message?: string, options?: Partial<ToastConfig>) => {
      showToast.success(title, message, options);
    },
    []
  );

  const error = useCallback(
    (title: string, message?: string, options?: Partial<ToastConfig>) => {
      showToast.error(title, message, options);
    },
    []
  );

  const info = useCallback(
    (title: string, message?: string, options?: Partial<ToastConfig>) => {
      showToast.info(title, message, options);
    },
    []
  );

  const warning = useCallback(
    (title: string, message?: string, options?: Partial<ToastConfig>) => {
      showToast.warning(title, message, options);
    },
    []
  );

  return {
    success,
    error,
    info,
    warning,
  };
};

/**
 * Hook for showing API-related toasts
 * Useful for manual API calls where automatic error handling isn't available
 */
export const useApiToast = () => {
  const toast = useToast();

  const handleApiError = useCallback(
    (error: any) => {
      if (error?.status) {
        switch (error.status) {
          case 400:
            toast.error(
              'Invalid Request',
              error.data?.message || 'Please check your input and try again.'
            );
            break;
          case 401:
            toast.error('Unauthorized', 'Please log in to continue.');
            break;
          case 403:
            toast.error(
              'Access Denied',
              "You don't have permission to perform this action."
            );
            break;
          case 404:
            toast.error('Not Found', 'The requested resource was not found.');
            break;
          case 422:
            toast.error(
              'Validation Error',
              error.data?.message || 'Please check your input.'
            );
            break;
          case 500:
            toast.error(
              'Server Error',
              'Something went wrong on our end. Please try again later.'
            );
            break;
          default:
            toast.error(
              'Request Failed',
              error.data?.message || 'An unexpected error occurred.'
            );
        }
      } else {
        toast.error(
          'Something went wrong',
          error?.message || 'An unexpected error occurred.'
        );
      }
    },
    [toast]
  );

  const handleApiSuccess = useCallback(
    (message: string, description?: string) => {
      toast.success(message, description);
    },
    [toast]
  );

  return {
    handleApiError,
    handleApiSuccess,
    ...toast,
  };
};
