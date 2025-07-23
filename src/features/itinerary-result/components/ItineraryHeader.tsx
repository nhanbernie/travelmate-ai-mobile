import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';
import { ItineraryData } from '../types';

interface ItineraryHeaderProps {
  data: ItineraryData;
}

export const ItineraryHeader: React.FC<ItineraryHeaderProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTripTypeColor = (tripType: string) => {
    switch (tripType) {
      case 'budget':
        return '#10b981';
      case 'luxury':
        return '#8b5cf6';
      default:
        return '#E95D77';
    }
  };

  const getTripTypeIcon = (tripType: string) => {
    switch (tripType) {
      case 'budget':
        return 'wallet-outline';
      case 'luxury':
        return 'diamond-outline';
      default:
        return 'star-outline';
    }
  };

  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-200">
      {/* Destination */}
      <View className="flex-row items-center mb-3">
        <Ionicons name="location-outline" size={24} color="#E95D77" />
        <AppText variant="h2" className="text-black font-bold ml-2">
          {data.destination}
        </AppText>
      </View>

      {/* Trip Details */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text className="text-sm text-gray-600 ml-1">
            {formatDate(data.startDate)} - {formatDate(data.endDate)}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text className="text-sm text-gray-600 ml-1">
            {data.numberOfTravelers} travelers
          </Text>
        </View>
      </View>

      {/* Trip Type & Preferences */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons 
            name={getTripTypeIcon(data.tripType) as any} 
            size={16} 
            color={getTripTypeColor(data.tripType)} 
          />
          <Text 
            className="text-sm font-medium ml-1 capitalize"
            style={{ color: getTripTypeColor(data.tripType) }}
          >
            {data.tripType}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="heart-outline" size={16} color="#666" />
          <Text className="text-sm text-gray-600 ml-1">
            {data.preferences.length} preferences
          </Text>
        </View>
      </View>

      {/* Preferences Tags */}
      {data.preferences.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mt-3">
          {data.preferences.map((preference, index) => (
            <View 
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full"
            >
              <Text className="text-xs text-gray-700 capitalize">
                {preference}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
