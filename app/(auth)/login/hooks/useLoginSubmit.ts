import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/services/auth';
import {
  setCredentials,
  setLoading,
  setError,
} from '@/redux/slices/auth.slice';
import { router } from 'expo-router';

export function useLoginSubmit() {
  const dispatch = useAppDispatch();
  const [loginMutation] = useLoginMutation();

  return useCallback(
    async (data: { email: string; password: string }) => {
      console.log('Submitting login with data:', data);
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const result = await loginMutation(data).unwrap();
        if (result.success && result.data) {
          dispatch(
            setCredentials({
              user: result.data.user,
              access_token: result.data.access_token,
              refresh_token: result.data.refresh_token,
              expires_in: result.data.expires_in,
            })
          );
          router.replace('/(main)');
        } else {
          throw new Error(result.message || 'Login failed');
        }
      } catch (error: any) {
        let errorMessage = 'Login failed. Please try again.';
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        dispatch(setError(errorMessage));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, loginMutation]
  );
}
