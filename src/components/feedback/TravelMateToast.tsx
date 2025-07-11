import React from 'react';
import { View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { AppText } from '@/components/ui/AppText';
import { cn } from '@/utils/cn';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ToastComponentProps {
  text1?: string;
  text2?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

const getToastConfig = (type: ToastComponentProps['type'], colors: any) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: null, // Sẽ dùng gradient
        gradientColors: ['#FEE7ED', '#FFFFFF'],
        iconName: 'checkmark-circle' as const,
        iconColor: '#E95D77',
        titleColor: '#E95D77',
        messageColor: '#4B5563',
        borderColor: '#FFFFFF',
        useGradient: true,
      };
    case 'error':
      return {
        backgroundColor: 'bg-red-500',
        iconName: 'alert-circle' as const,
        iconColor: '#fff',
        titleColor: '#fff',
        messageColor: '#fff',
        borderColor: '#EF4444',
        useGradient: false,
      };
    case 'warning':
      return {
        backgroundColor: 'bg-amber-500',
        iconName: 'warning' as const,
        iconColor: '#fff',
        titleColor: '#fff',
        messageColor: '#fff',
        borderColor: '#F59E0B',
        useGradient: false,
      };
    default:
      return {
        backgroundColor: 'bg-primary',
        iconName: 'information-circle' as const,
        iconColor: '#fff',
        titleColor: '#fff',
        messageColor: '#fff',
        borderColor: colors.primaryColor,
        useGradient: false,
      };
  }
};

const TravelMateToast = ({
  text1,
  text2,
  type = 'info',
}: ToastComponentProps) => {
  const { colors } = useTheme();
  const config = getToastConfig(type, colors);

  const baseStyle = {
    borderWidth: 1,
    borderColor: config.borderColor,
  };

  const containerClass = cn(
    `flex-row items-center rounded-3xl px-4 py-5 overflow-hidden`,
    !config.useGradient && config.backgroundColor
  );

  return (
    <View
      className="mx-4 overflow-hidden rounded-3xl shadow"
      style={{
        width: width - 32,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      {config.useGradient ? (
        <LinearGradient
          colors={
            (config.gradientColors as [string, string]) || [
              '#FEE7ED',
              '#FFFFFF',
            ]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={containerClass}
          style={baseStyle}
        >
          <View className="mr-3">
            <Ionicons
              name={config.iconName}
              size={24}
              color={config.iconColor}
            />
          </View>
          <View className="flex-1">
            <AppText
              className="text-base leading-5 font-semibold mb-1"
              numberOfLines={1}
              style={{ color: config.titleColor }}
            >
              {text1}
            </AppText>
            {text2 ? (
              <AppText
                className="text-sm leading-4 mt-0.5"
                numberOfLines={2}
                style={{ color: config.messageColor }}
              >
                {text2}
              </AppText>
            ) : null}
          </View>
        </LinearGradient>
      ) : (
        <View className={containerClass} style={baseStyle}>
          <View className="mr-3">
            <Ionicons
              name={config.iconName}
              size={24}
              color={config.iconColor}
            />
          </View>
          <View className="flex-1">
            <AppText
              className="text-base leading-5 font-semibold"
              numberOfLines={1}
              style={{ color: config.titleColor }}
            >
              {text1}
            </AppText>
            {text2 ? (
              <AppText
                className="text-sm leading-4 mt-0.5"
                numberOfLines={2}
                style={{ color: config.messageColor }}
              >
                {text2}
              </AppText>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
};

export default TravelMateToast;
