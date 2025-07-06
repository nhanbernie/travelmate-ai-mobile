import { StatusBar, View, useColorScheme, Text } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { StyleProp, ViewStyle } from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ScreenWrapper = ({ children, style }: ScreenWrapperProps) => {
  const { isDark, theme, colors } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" style={style}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
