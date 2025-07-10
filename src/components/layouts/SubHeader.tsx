import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { AppText } from '../ui';
import { useTheme } from '@/hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface SubHeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
  useGradient?: boolean;
  gradientColors?: string[];
  children?: React.ReactNode;
  customBackIcon?: React.ReactNode;
  titleClassName?: string;
  contentClassName?: string;
  strokeBottom?: boolean;
}

const SubHeader = ({
  title,
  showBackButton = true,
  rightComponent,
  onBackPress,
  useGradient = false,
  gradientColors,
  children,
  customBackIcon,
  titleClassName,
  contentClassName = 'flex-row py-4 items-center',
  strokeBottom = false,
}: SubHeaderProps) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const defaultGradientColors = [colors.primaryColor, colors.secondaryColor];

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const renderContent = () => (
    <View
      className={`flex-row items-center justify-between px-6 ${
        strokeBottom ? 'border border-b border-gray-100' : ''
      }  `}
      style={{
        paddingTop: insets.top,
      }}
    >
      {children ? (
        children
      ) : (
        <>
          <View className={contentClassName}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBackPress}
                className="mr-3 p-2 rounded-full"
                style={{
                  backgroundColor: useGradient
                    ? 'rgba(255, 255, 255, 0.2)'
                    : colors.background,
                }}
              >
                {customBackIcon || (
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={useGradient ? '#FFFFFF' : colors.textPrimary}
                  />
                )}
              </TouchableOpacity>
            )}
            {title && (
              <AppText
                variant="h2"
                className={`font-semibold ${titleClassName || ''}`}
                style={{ color: useGradient ? '#FFFFFF' : colors.primaryColor }}
              >
                {title}
              </AppText>
            )}
          </View>

          {rightComponent && <View>{rightComponent}</View>}
        </>
      )}
    </View>
  );

  return useGradient ? (
    <LinearGradient
      colors={
        (gradientColors && gradientColors.length >= 2
          ? gradientColors
          : defaultGradientColors) as [string, string, ...string[]]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {renderContent()}
    </LinearGradient>
  ) : (
    renderContent()
  );
};

export default SubHeader;
