import { router } from 'expo-router';
import { useCallback } from 'react';

export const useSafeNavigation = () => {
  const navigate = useCallback((path: any) => {
    try {
      router.push(path);
    } catch (error) {
      console.warn('Navigation error:', error);
      // NOTE: show toast or alert in production
    }
  }, []);

  const canNavigate = useCallback(() => {
    try {
      return router && typeof router.push === 'function';
    } catch (error) {
      return false;
    }
  }, []);

  const goBack = useCallback(() => {
    try {
      router.back();
    } catch (error) {
      console.warn('Navigation back error:', error);
    }
  }, []);

  return {
    navigate,
    goBack,
    canNavigate,
  };
};
