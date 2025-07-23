import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';
import { ItineraryData } from '../types';

interface WeatherSummaryProps {
  data: ItineraryData;
}

export const WeatherSummary: React.FC<WeatherSummaryProps> = ({ data }) => {
  const getWeatherIcon = (chanceOfRain: number) => {
    if (chanceOfRain > 60) return 'rainy-outline';
    if (chanceOfRain > 30) return 'partly-sunny-outline';
    return 'sunny-outline';
  };

  const getWeatherColor = (chanceOfRain: number) => {
    if (chanceOfRain > 60) return '#6b7280';
    if (chanceOfRain > 30) return '#f59e0b';
    return '#f97316';
  };

  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-200">
      <View className="flex-row items-center mb-3">
        <Ionicons 
          name={getWeatherIcon(data.chanceOfRain)} 
          size={20} 
          color={getWeatherColor(data.chanceOfRain)} 
        />
        <AppText variant="label" className="text-black font-semibold ml-2">
          Weather Forecast
        </AppText>
      </View>

      <AppText variant="body" className="text-gray-700 mb-4 leading-6">
        {data.weatherSummary}
      </AppText>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="thermometer-outline" size={16} color="#666" />
          <Text className="text-sm text-gray-600 ml-1">
            {data.temperatureMin}°C - {data.temperatureMax}°C
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="water-outline" size={16} color="#3b82f6" />
          <Text className="text-sm text-gray-600 ml-1">
            {data.chanceOfRain}% rain
          </Text>
        </View>
      </View>
    </View>
  );
};
