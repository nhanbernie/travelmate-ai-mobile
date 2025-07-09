import { StatusBar, View, Dimensions } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React, { useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { StyleProp, ViewStyle } from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ScreenWrapper = ({ children, style }: ScreenWrapperProps) => {
  const { isDark, theme, colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get('window');

  const stableValues = useMemo(() => {
    const backgroundColor = isDark ? '#1F2937' : '#FFFFFF';
    const stableInsets = {
      top: insets.top,
      left: insets.left,
      right: insets.right,
      bottom: 0,
    };

    console.log('Current insets:', insets, 'theme:', theme);
    console.log('Stable values:', { stableInsets, backgroundColor, theme });

    return { backgroundColor, stableInsets };
  }, [insets.top, insets.left, insets.right, isDark, theme]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: stableValues.backgroundColor,
        height: screenHeight,
      }}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View
        style={[
          {
            flex: 1,
            paddingTop: stableValues.stableInsets.top,
            paddingLeft: stableValues.stableInsets.left,
            paddingRight: stableValues.stableInsets.right,
            // paddingBottom: stableValues.stableInsets.bottom,
            backgroundColor: stableValues.backgroundColor,
          },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default ScreenWrapper;
