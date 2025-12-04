import React from "react";
import { View } from "react-native";
import AppButton from "./AppButton";
import { Svg, Path } from "react-native-svg";

interface GoogleSignInButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

// Google Logo SVG Component
const GoogleIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <Path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <Path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <Path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </Svg>
);

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onPress,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <AppButton
      title="Continue with Google"
      onPress={onPress}
      isLoading={isLoading}
      disabled={disabled}
      className="bg-white border-2 border-gray-200"
      textClassName="text-gray-700 font-semibold text-base"
      startIcon={!isLoading ? <GoogleIcon /> : undefined}
      activeOpacity={0.7}
    />
  );
};

// Divider component for "Or continue with"
export const OrDivider: React.FC = () => {
  return (
    <View className="flex-row items-center my-6">
      <View className="flex-1 h-[1px] bg-gray-300" />
      <View className="px-4">
        <View className="text-gray-500 text-sm">Or continue with</View>
      </View>
      <View className="flex-1 h-[1px] bg-gray-300" />
    </View>
  );
};
