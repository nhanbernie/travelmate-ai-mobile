import React from 'react';
import { View, Pressable } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { TravelPreference } from '../types';
import { cn } from '@/utils/cn';

interface TravelPreferencesProps {
  preferences: TravelPreference[];
  onPreferenceToggle: (id: string) => void;
}

const TravelPreferences: React.FC<TravelPreferencesProps> = ({
  preferences,
  onPreferenceToggle,
}) => {
  const { colors } = useTheme();

  return (
    <View className="mb-6">
      <AppText variant="title" className="text-gray-900 font-semibold mb-4">
        Travel Preferences
      </AppText>

      <View className="flex-row flex-wrap gap-3">
        {preferences.map((preference) => (
          <Pressable
            key={preference.id}
            onPress={() => onPreferenceToggle(preference.id)}
            className={cn(
              'flex-1 min-w-[45%] rounded-xl p-4 flex-row items-center',
              preference.selected ? preference.color : 'bg-gray-50'
            )}
          >
            <View className="w-8 h-8 rounded-full bg-white items-center justify-center mr-3">
              <AppText variant="body" className="text-lg">
                {preference.icon}
              </AppText>
            </View>
            <AppText
              variant="body"
              className={cn(
                'font-medium',
                preference.selected ? 'text-white' : 'text-gray-700'
              )}
            >
              {preference.name}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default TravelPreferences;
