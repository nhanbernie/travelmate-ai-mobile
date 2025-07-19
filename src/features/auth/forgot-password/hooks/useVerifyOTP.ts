import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useVerifyOtpMutation } from '@/services/auth';
import { setLoading, setError } from '@/redux/slices/auth.slice';
import { router } from 'expo-router';

const useVerifyOTP = () => {
  const dispatch = useAppDispatch();
  const [verifyOtp] = useVerifyOtpMutation();
  return useCallback(
    async (data: { email: string; otp: string }) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const result = await verifyOtp({
          email: data.email,
          otp: data.otp,
        }).unwrap();
        if (result.success) {
          // Pass email and OTP to reset-password page
          router.replace({
            pathname: '/(auth)/forgot-password/reset-password',
            params: {
              email: data.email,
              otp: data.otp,
            },
          });
        }
      } catch (error: any) {
        console.error('Error verifying OTP:', error);
        let errorMessage = 'Failed to verify OTP. Please try again.';
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        dispatch(setError(errorMessage));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, verifyOtp]
  );
};

export default useVerifyOTP;
