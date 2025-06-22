import React from 'react';
import { View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { AppText } from './ui';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AuthLoginProps {
  type: 'login' | 'register' | 'forgotPassword';
}

const AuthLogin = ({ type }: AuthLoginProps) => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  const handleNavigation = () => {
    router.push(
      type === 'login'
        ? { pathname: '/(auth)/register' }
        : { pathname: '/(auth)/login' }
    );
  };

  return (
    <View className="mt-16 space-y-6">
      {/* Divider */}
      <View className="flex-row items-center mb-4">
        <View className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        <AppText className="mx-4 text-gray-500 text-sm">
          Or continue with
        </AppText>
        <View className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
      </View>

      {/* Social Buttons */}
      <View className="flex-row justify-center gap-4 mb-6">
        <Pressable
          onPress={() => handleSocialLogin('google')}
          className="w-14 h-14 bg-white dark:bg-gray-800 rounded-full items-center justify-center border border-gray-200 dark:border-gray-700"
        >
          <Ionicons name="logo-google" size={24} color="black" />
        </Pressable>

        <Pressable
          onPress={() => handleSocialLogin('apple')}
          className="w-14 h-14 bg-white dark:bg-gray-800 rounded-full items-center justify-center border border-gray-200 dark:border-gray-700"
        >
          <Ionicons name="logo-apple" size={24} color="#000" />
        </Pressable>

        <Pressable
          onPress={() => handleSocialLogin('facebook')}
          className="w-14 h-14 bg-white dark:bg-gray-800 rounded-full items-center justify-center border border-gray-200 dark:border-gray-700"
        >
          <Ionicons name="logo-facebook" size={24} color="#1877F2" />
        </Pressable>
      </View>

      <Pressable onPress={handleNavigation} className="items-center">
        <AppText className="text-center text-gray-600 dark:text-gray-400">
          {type === 'login'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <AppText weight="bold" className="text-[#00C5A7]">
            {type === 'login' ? 'Sign Up' : 'Sign In'}
          </AppText>
        </AppText>
      </Pressable>
    </View>
  );
};

export default AuthLogin;
