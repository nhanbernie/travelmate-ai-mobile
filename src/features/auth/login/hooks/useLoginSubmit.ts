import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/services/auth';
import { setLoading, setError, setUser } from '@/redux/slices/auth.slice';
import { router } from 'expo-router';
import { SecureStorageService } from '@/services/storage/secureStorage.service';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';

const useLoginSubmit = () => {
  const { login } = useAuth();
  const dispatch = useAppDispatch();
  const [loginMutation] = useLoginMutation();
  const toast = useToast();

  return useCallback(
    async (data: { email: string; password: string }) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const result = await loginMutation(data).unwrap();
        if (result.success && result.data) {
          await SecureStorageService.setTokenData({
            access_token: result.data.access_token,
            refresh_token: result.data.refresh_token,
            expires_in: result.data.expires_in || 900,
          });
          // Save login method as email
          await SecureStorageService.setLoginMethod('email');
          toast.success(result.message || 'Login successful');
          // await SecureStorageService.setUserData(result.data.user);
          login(result.data.user);
          dispatch(setUser(result.data.user));
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
};

export default useLoginSubmit;
