import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';
import { AppButton, AppText } from '@/components/ui';
import { ItineraryData } from './types';
import { ItineraryHeader } from './components/ItineraryHeader';
import { WeatherSummary } from './components/WeatherSummary';
import { AISuggestions } from './components/AISuggestions';
import { DaySchedule } from './components/DaySchedule';
import { CostSummary } from './components/CostSummary';

interface ItineraryResultScreenProps {
  itineraryData: ItineraryData;
}

const ItineraryResultScreen: React.FC<ItineraryResultScreenProps> = ({
  itineraryData,
}) => {
  const { colors } = useTheme();
  const { navigate, goBack } = useSafeNavigation();

  const handleSaveItinerary = () => {
    // TODO: Implement save functionality
    console.log('Save itinerary:', itineraryData.itineraryId);
  };

  const handleShareItinerary = () => {
    // TODO: Implement share functionality
    console.log('Share itinerary:', itineraryData.itineraryId);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4 gap-4">
          {/* Itinerary Header */}
          <ItineraryHeader data={itineraryData} />

          {/* Weather Summary */}
          <WeatherSummary data={itineraryData} />

          {/* AI Summary */}
          <View className="bg-white rounded-2xl p-4 border border-gray-200">
            <View className="flex-row items-center mb-3">
              <Ionicons name="sparkles-outline" size={20} color="#E95D77" />
              <AppText
                variant="label"
                className="text-black font-semibold ml-2"
              >
                AI Summary
              </AppText>
            </View>
            <AppText variant="body" className="text-gray-700 leading-6">
              {itineraryData.aiSummary}
            </AppText>
          </View>

          {/* AI Suggestions */}
          <AISuggestions suggestions={itineraryData.aiSuggestions} />

          {/* Daily Schedule */}
          {itineraryData.days.map((day) => (
            <DaySchedule key={day.dayNumber} day={day} />
          ))}

          {/* Cost Summary */}
          <CostSummary
            totalCost={itineraryData.totalEstimatedCost}
            numberOfTravelers={itineraryData.numberOfTravelers}
          />
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="bg-white p-4 border-t border-gray-200">
        <View className="flex-row gap-3">
          <AppButton
            onPress={() => navigate('/trips')}
            className="flex-1 py-3 px-4 rounded-2xl bg-gray-100"
            title="View All Trips"
            textClassName="text-gray-700 font-semibold"
          />
          <AppButton
            onPress={handleSaveItinerary}
            className="flex-1 py-3 px-4 rounded-2xl"
            style={{
              backgroundColor: colors.primaryColor,
            }}
            title="Save Itinerary"
            textClassName="text-white font-semibold"
          />
        </View>
      </View>
    </View>
  );
};

export default ItineraryResultScreen;
