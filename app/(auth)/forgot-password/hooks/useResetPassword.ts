// import { useCallback } from 'react';
// import { useAppDispatch } from '@/redux/hooks';
// import { useForgotPasswordMutation } from '@/services/auth';
// import { setLoading, setError } from '@/redux/slices/auth.slice';
// import { router } from 'expo-router';
// export function useForgotPassword() {
//   const dispatch = useAppDispatch();
//   const [forgotPasswordMutation] = useForgotPasswordMutation();

//   return useCallback(
//     async (data: { email: string }) => {
//       console.log('Submitting forgot password for email:', data.email);
//       try {
//         dispatch(setLoading(true));
//         dispatch(setError(null));
//         const result = await forgotPasswordMutation(data).unwrap();
//         console.log('SUBMIT FORGOT PASSWORD', data.email, result);

//         if (result.success) {
//           router.replace('/(auth)/forgot-password/verify-code');
//         }
//       } catch (error: any) {
//         let errorMessage = 'Failed to send reset email. Please try again.';
//         if (error?.data?.message) errorMessage = error.data.message;
//         else if (error?.message) errorMessage = error.message;
//         dispatch(setError(errorMessage));
//       } finally {
//         dispatch(setLoading(false));
//       }
//     },
//     [dispatch, forgotPasswordMutation]
//   );
// }

import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useResetPasswordMutation } from '@/services/auth';
import { setLoading, setError } from '@/redux/slices/auth.slice';
import { router } from 'expo-router';

export function useResetPassword() {
  const dispatch = useAppDispatch();
  const [resetPasswordMutation] = useResetPasswordMutation();
  return useCallback(
    async (data: {
      email: string;
      otp: string;
      password: string; // From form
    }) => {
      console.log('Submitting reset password for email:', data.email);
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        // Convert from form structure to API structure
        const result = await resetPasswordMutation({
          email: data.email,
          otp: data.otp,
          newPassword: data.password, // Map password từ form sang newPassword cho API
        }).unwrap();

        console.log('SUBMIT RESET PASSWORD', data, result);
        if (result.success) {
          router.push('/(auth)/login');
        }
      } catch (error: any) {
        console.error('Error resetting password:', error);
        let errorMessage = 'Failed to reset password. Please try again.';
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        dispatch(setError(errorMessage));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, resetPasswordMutation]
  );
}
