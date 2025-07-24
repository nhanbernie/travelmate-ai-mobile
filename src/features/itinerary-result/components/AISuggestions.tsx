import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';

interface AISuggestionsProps {
  suggestions: string[];
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({ suggestions }) => {
  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-200">
      <View className="flex-row items-center mb-3">
        <Ionicons name="bulb-outline" size={20} color="#f59e0b" />
        <AppText variant="label" className="text-black font-semibold ml-2">
          AI Recommendations
        </AppText>
      </View>

      <View className="gap-3">
        {suggestions.map((suggestion, index) => (
          <View key={index} className="flex-row items-start">
            <View className="w-6 h-6 rounded-full bg-amber-100 items-center justify-center mr-3 mt-0.5">
              <Text className="text-xs font-bold text-amber-600">
                {index + 1}
              </Text>
            </View>
            <Text className="flex-1 text-sm text-gray-700 leading-5">
              {suggestion}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
