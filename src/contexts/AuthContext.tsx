import React, { createContext, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { SecureStorageService } from '@/services/storage/secureStorage.service';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: any, tokenData: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const authenticated = await SecureStorageService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        router.replace('/(main)');
      } else {
        router.replace('/(auth)/login');
      }
    } catch (error) {
      setIsAuthenticated(false);
      router.replace('/(auth)/login');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: any, tokenData: any) => {
    await SecureStorageService.setUserData(userData);
    await SecureStorageService.setTokenData(tokenData);
    setIsAuthenticated(true);
    router.replace('/(main)');
  };

  const logout = async () => {
    await SecureStorageService.clearAuthData();
    setIsAuthenticated(false);
    router.replace('/(auth)/login');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
