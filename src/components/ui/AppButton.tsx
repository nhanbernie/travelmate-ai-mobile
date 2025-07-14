import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  GestureResponderEvent,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { cn } from '@/utils/cn';

interface AppButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  classNameButton?: string;
  textClassName?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  activeOpacity?: number;
}

const AppButton = ({
  title,
  onPress,
  isLoading,
  disabled,
  className,
  style,
  classNameButton,
  textClassName,
  startIcon,
  endIcon,
  activeOpacity = 0.6,
}: AppButtonProps) => {
  const mergedClass = cn(
    'flex-row items-center justify-center px-4 py-3 rounded-full bg-gray-100',
    disabled ? 'opacity-50' : '',
    className
  );

  return (
    <TouchableOpacity
      className={mergedClass}
      style={style}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View
          className={cn('flex-row justify-start items-center', classNameButton)}
        >
          {startIcon && <View className="mr-2">{startIcon}</View>}
          {title && (
            <Text className={cn('text-black font-medium', textClassName)}>
              {title}
            </Text>
          )}
          {endIcon && <View className="ml-2">{endIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
