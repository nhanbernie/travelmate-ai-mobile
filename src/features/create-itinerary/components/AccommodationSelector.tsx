import React from 'react';
import { View, Pressable } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { AccommodationType } from '../types';
import { cn } from '@/utils/cn';

interface AccommodationSelectorProps {
  accommodations: AccommodationType[];
  onAccommodationToggle: (id: string) => void;
}

const AccommodationSelector: React.FC<AccommodationSelectorProps> = ({
  accommodations,
  onAccommodationToggle,
}) => {
  const { colors } = useTheme();

  return (
    <View className="mb-6">
      <AppText variant="title" className="text-gray-900 font-semibold mb-4">
        Additional Preferences
      </AppText>

      <AppText variant="body" className="text-gray-600 mb-3">
        Accommodation
      </AppText>

      <View className="flex-row flex-wrap gap-2">
        {accommodations.map((accommodation) => (
          <Pressable
            key={accommodation.id}
            onPress={() => onAccommodationToggle(accommodation.id)}
            className={cn(
              'px-4 py-2 rounded-full border',
              accommodation.selected
                ? 'bg-teal-500 border-teal-500'
                : 'bg-white border-gray-300'
            )}
          >
            <AppText
              variant="body"
              className={cn(
                'font-medium',
                accommodation.selected ? 'text-white' : 'text-gray-700'
              )}
            >
              {accommodation.name}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default AccommodationSelector;
