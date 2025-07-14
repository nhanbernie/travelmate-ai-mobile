import React, { useState } from 'react';
import { View, Pressable, Platform } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';

interface DateSelectorProps {
  label: string;
  value: Date | null;
  onDateChange: (date: Date | null) => void;
  placeholder?: string;
  minimumDate?: Date;
  icon?: string;
  error?: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  label,
  value,
  onDateChange,
  placeholder = 'Select date',
  minimumDate,
  icon = 'calendar-outline',
  error,
}) => {
  const { colors } = useTheme();

  const handleDatePress = () => {
    // TODO: Implement date picker modal or use expo-date-picker
    console.log('Date picker pressed');
  };

  const formatDate = (date: Date | null) => {
    if (!date) return placeholder;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View className="flex-1">
      <View className="mb-2">
        <AppText variant="label" className="text-orange-600 font-semibold">
          📅 {label}
        </AppText>
      </View>

      <Pressable
        onPress={handleDatePress}
        className={cn(
          'bg-orange-50 rounded-xl p-4 flex-row items-center justify-between',
          error && 'border border-red-300'
        )}
      >
        <AppText
          variant="body"
          className={cn('flex-1', value ? 'text-gray-900' : 'text-gray-500')}
        >
          {formatDate(value)}
        </AppText>
        <Ionicons name={icon as any} size={20} color="#F97316" />
      </Pressable>

      {error && (
        <AppText variant="error" className="mt-1 ml-1">
          {error}
        </AppText>
      )}
    </View>
  );
};

export default DateSelector;
