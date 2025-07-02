import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useForgotPasswordMutation } from '@/services/auth';
import { setLoading, setError } from '@/redux/slices/auth.slice';
import { router } from 'expo-router';
const useForgotPassword = () => {
  const dispatch = useAppDispatch();
  const [forgotPasswordMutation] = useForgotPasswordMutation();

  return useCallback(
    async (data: { email: string }) => {
      console.log('Submitting forgot password for email:', data.email);
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const result = await forgotPasswordMutation(data).unwrap();
        console.log('SUBMIT FORGOT PASSWORD', data.email, result);

        if (result.success) {
          router.push({
            pathname: '/(auth)/forgot-password/verify-otp',
            params: { email: data.email },
          });
        }
      } catch (error: any) {
        let errorMessage = 'Failed to send reset email. Please try again.';
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        dispatch(setError(errorMessage));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, forgotPasswordMutation]
  );
};

export default useForgotPassword;
