import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  GestureResponderEvent,
  View,
} from 'react-native';
import { cn } from '@/utils/cn';
import { AppText } from './AppText';

interface AppButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  classNameButton?: string;
  textClassName?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const AppButton = ({
  title,
  onPress,
  isLoading,
  disabled,
  className,
  classNameButton,
  textClassName,
  startIcon,
  endIcon,
}: AppButtonProps) => {
  const mergedClass = cn(
    'flex-row items-center px-4 py-3 rounded-full bg-blue-500',
    startIcon ? 'justify-start' : 'justify-center',
    disabled ? 'opacity-50' : '',
    className
  );

  return (
    <TouchableOpacity
      className={mergedClass}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View className={cn('flex-row items-center', classNameButton)}>
          {startIcon && <View className="mr-2">{startIcon}</View>}
          {title && (
            <AppText
              variant="title"
              className={cn('text-white font-medium', textClassName)}
            >
              {title}
            </AppText>
          )}
          {endIcon && <View className="ml-2">{endIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
