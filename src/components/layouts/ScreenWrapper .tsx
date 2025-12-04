import { Platform, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useMemo } from "react";
import { useTheme } from "@/hooks/useTheme";
import { StyleProp, ViewStyle } from "react-native";

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  useSafeArea?:
    | boolean
    | {
        top?: boolean;
        bottom?: boolean;
        left?: boolean;
        right?: boolean;
      };
}

const ScreenWrapper = ({ children, style, useSafeArea = true }: ScreenWrapperProps) => {
  const { isDark, colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Convert boolean to object if needed
  const safeAreaConfig =
    typeof useSafeArea === "boolean"
      ? {
          top: useSafeArea,
          bottom: false,
          left: useSafeArea,
          right: useSafeArea,
        }
      : { top: true, bottom: false, left: true, right: true, ...useSafeArea };

  const wrapperStyle = useMemo(() => {
    return {
      flex: 1,
      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
      paddingTop: safeAreaConfig.top ? insets.top : 0,
      paddingLeft: safeAreaConfig.left ? insets.left : 0,
      paddingRight: safeAreaConfig.right ? insets.right : 0,
      paddingBottom: Platform.OS === "android" ? 0 : insets.bottom,
    };
  }, [insets, isDark, colors, safeAreaConfig]);

  return (
    <View style={{ flex: 1, backgroundColor: wrapperStyle.backgroundColor }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <View style={[wrapperStyle, style]}>{children}</View>
    </View>
  );
};

export default ScreenWrapper;
