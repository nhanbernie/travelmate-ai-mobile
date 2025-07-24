import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useResetPasswordMutation } from '@/services/auth';
import { setLoading, setError } from '@/redux/slices/auth.slice';
import { router } from 'expo-router';

const useResetPassword = () => {
  const dispatch = useAppDispatch();
  const [resetPasswordMutation] = useResetPasswordMutation();

  return useCallback(
    async (data: {
      email: string;
      otp: string;
      password: string; // From form
    }) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const result = await resetPasswordMutation({
          email: data.email,
          otp: data.otp,
          newPassword: data.password,
        }).unwrap();

        if (result.success) {
          router.push('/(auth)/login/index');
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
};

export default useResetPassword;
