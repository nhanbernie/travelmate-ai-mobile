import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';

interface DestinationInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
}

const DestinationInput: React.FC<DestinationInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Where would you like to go?',
  error,
}) => {
  const { colors } = useTheme();

  return (
    <View className="mb-6">
      <View
        className={cn(
          'flex-row items-center bg-pink-50 rounded-xl p-4',
          error && 'border border-red-300'
        )}
      >
        <Ionicons
          name="location-outline"
          size={20}
          color="#E95D77"
          style={{ marginRight: 12 }}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#E95D77"
          className="flex-1 text-base text-gray-900"
          style={{ color: colors.textPrimary }}
        />
      </View>
      {error && (
        <AppText variant="error" className="mt-1 ml-1">
          {error}
        </AppText>
      )}
    </View>
  );
};

export default DestinationInput;
