import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useVerifyOtpMutation } from '@/services/auth';
import { setLoading, setError } from '@/redux/slices/auth.slice';
import { router } from 'expo-router';

export function useVerifyOTP() {
  const dispatch = useAppDispatch();
  const [verifyOtp] = useVerifyOtpMutation();
  return useCallback(
    async (data: { email: string; otp: string }) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const result = await verifyOtp({
          email: data.email,
          code: data.otp,
        }).unwrap();
        console.log('SUBMIT VERIFY OTP', data, result);
        if (result.success) {
          router.replace('/(auth)/forgot-password/reset-password');
        }
      } catch (error: any) {
        let errorMessage = 'Failed to verify OTP. Please try again.';
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        dispatch(setError(errorMessage));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );
}
