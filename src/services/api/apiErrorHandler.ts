import { isRejectedWithValue } from '@reduxjs/toolkit';
import { showToast } from '@/services/toast/toastService';

/**
 * Enhanced error handler that automatically shows toast messages for API errors
 */
export const apiErrorHandler = (store: any) => (next: any) => (action: any) => {
  // RTK Query error handling
  if (isRejectedWithValue(action)) {
    const error = (action as any).payload;

    // Handle different types of errors
    if (error?.status) {
      switch (error.status) {
        case 400:
          showToast.error(
            'Invalid Request',
            error.data?.message || 'Please check your input and try again.'
          );
          break;

        case 401:
          if ((action as any).meta?.arg?.url?.includes('refresh')) {
            showToast.error(
              'Session Expired',
              'Please log in again to continue.'
            );
          }
          showToast.error('Incorrect password or email', 'Please check and try again');
          break;

        case 403:
          showToast.error(
            'Access Denied',
            "You don't have permission to perform this action."
          );
          break;

        case 404:
          showToast.error('Not Found', 'The requested resource was not found.');
          break;

        case 422:
          // Validation errors
          const validationMessage =
            error.data?.message || 'Please check your input.';
          showToast.error('Validation Error', validationMessage);
          break;

        case 429:
          showToast.warning(
            'Too Many Requests',
            'Please wait a moment before trying again.'
          );
          break;

        case 500:
          showToast.error(
            'Server Error',
            'Something went wrong on our end. Please try again later.'
          );
          break;

        case 502:
        case 503:
        case 504:
          showToast.error(
            'Service Unavailable',
            'Our servers are temporarily unavailable. Please try again later.'
          );
          break;

        default:
          // Generic error for other HTTP status codes
          if (error.status >= 400) {
            showToast.error(
              'Request Failed',
              error.data?.message || 'An unexpected error occurred.'
            );
          }
      }
    } else if (
      error?.name === 'NetworkError' ||
      error?.message?.includes('Network')
    ) {
      // Network errors
      showToast.error(
        'Connection Error',
        'Please check your internet connection and try again.'
      );
    } else if (error?.name === 'TimeoutError') {
      // Timeout errors
      showToast.error(
        'Request Timeout',
        'The request took too long. Please try again.'
      );
    } else {
      // Generic error for unknown errors
      showToast.error(
        'Something went wrong',
        error?.message || 'An unexpected error occurred.'
      );
    }
  }

  return next(action);
};

/**
 * Success handler for API operations
 */
export const apiSuccessHandler =
  (store: any) => (next: any) => (action: any) => {
    // Handle successful API operations that should show success messages
    if (action.type.endsWith('/fulfilled')) {
      const endpointName = action.type.split('/')[0];

      // Define which endpoints should show success messages
      const successMessages: Record<
        string,
        { title: string; message: string }
      > = {
        // Auth endpoints
        'authApi/login': {
          title: 'Welcome back!',
          message: 'You have successfully logged in.',
        },
        'authApi/register': {
          title: 'Account created!',
          message: 'Your account has been created successfully.',
        },
        'authApi/resetPassword': {
          title: 'Password reset!',
          message: 'Your password has been reset successfully.',
        },
        // Add more endpoints as needed
      };

      const successConfig = successMessages[endpointName];
      if (successConfig) {
        showToast.success(successConfig.title, successConfig.message);
      }
    }

    return next(action);
  };

/**
 * Combined middleware for handling both errors and successes
 */
export const apiToastMiddleware =
  (store: any) => (next: any) => (action: any) => {
    // First handle errors
    apiErrorHandler(store)(next)(action);

    // Then handle successes
    apiSuccessHandler(store)(next)(action);

    return next(action);
  };
