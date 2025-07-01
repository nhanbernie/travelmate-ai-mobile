import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useRegisterMutation } from '@/services/auth';
import {
  setCredentials,
  setLoading,
  setError,
} from '@/redux/slices/auth.slice';
import { router } from 'expo-router';
export function useRegisterSubmit() {
  const dispatch = useAppDispatch();
  const [registerMutation] = useRegisterMutation();

  return useCallback(
    async (data: {
      email: string;
      password: string;
      confirmPassword: string;
      username?: string;
    }) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const result = await registerMutation({
          ...data,
          username: data.username ?? '',
        }).unwrap();
        console.log('SUBMIT REGISTER', data, result);
        
        if (result.success && result.data) {
          dispatch(
            setCredentials({
              user: result.data.user,
              access_token: result.data.access_token,
              refresh_token: result.data.refresh_token,
              expires_in: result.data.expires_in,
            })
          );
          router.replace('/(auth)/login');
        } else {
          throw new Error(result.message || 'Registration failed');
        }
      } catch (error: any) {
        let errorMessage = 'Registration failed. Please try again.';
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        dispatch(setError(errorMessage));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, registerMutation]
  );
}
