import React, { useState } from 'react';
import { View, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppText } from '@/components/ui/AppText';

import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';

interface DateSelectorProps {
  label: string;
  value: Date | null;
  onValueChange: (date: Date | null) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  icon?: string;
  error?: string;
  mode?: 'date' | 'time' | 'datetime';
}

const DateSelector: React.FC<DateSelectorProps> = ({
  label,
  value,
  onValueChange,
  placeholder = 'Select date',
  minimumDate,
  maximumDate,
  icon = 'calendar-outline',
  error,
  mode = 'date',
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDatePress = () => {
    setShowPicker(true);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || value;
    setShowPicker(Platform.OS === 'ios');

    if (event.type === 'set' && currentDate) {
      onValueChange(currentDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return placeholder;

    if (mode === 'time') {
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    if (mode === 'datetime') {
      return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
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

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

export default DateSelector;
