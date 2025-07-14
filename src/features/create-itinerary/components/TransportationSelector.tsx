import React from 'react';
import { View, Pressable } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { TransportationType } from '../types';
import { cn } from '@/utils/cn';

interface TransportationSelectorProps {
  transportations: TransportationType[];
  onTransportationToggle: (id: string) => void;
}

const TransportationSelector: React.FC<TransportationSelectorProps> = ({
  transportations,
  onTransportationToggle,
}) => {
  const { colors } = useTheme();

  return (
    <View className="mb-8">
      <AppText variant="body" className="text-gray-600 mb-3">
        Transportation
      </AppText>

      <View className="flex-row flex-wrap gap-2">
        {transportations.map((transportation) => (
          <Pressable
            key={transportation.id}
            onPress={() => onTransportationToggle(transportation.id)}
            className={cn(
              'px-4 py-2 rounded-full border flex-row items-center',
              transportation.selected
                ? 'bg-teal-500 border-teal-500'
                : 'bg-white border-gray-300'
            )}
          >
            <Ionicons
              name={transportation.icon as any}
              size={16}
              color={transportation.selected ? '#FFFFFF' : '#6B7280'}
              style={{ marginRight: 6 }}
            />
            <AppText
              variant="body"
              className={cn(
                'font-medium',
                transportation.selected ? 'text-white' : 'text-gray-700'
              )}
            >
              {transportation.name}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default TransportationSelector;
