import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';
import { ItineraryDay } from '../types';
import { ActivityCard } from './ActivityCard';

interface DayScheduleProps {
  day: ItineraryDay;
}

export const DaySchedule: React.FC<DayScheduleProps> = ({ day }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getWeatherIcon = (chanceOfRain: number) => {
    if (chanceOfRain > 60) return 'rainy-outline';
    if (chanceOfRain > 30) return 'partly-sunny-outline';
    return 'sunny-outline';
  };

  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-200">
      {/* Day Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-[#E95D77] items-center justify-center mr-3">
            <Text className="text-sm font-bold text-white">
              {day.dayNumber}
            </Text>
          </View>
          <View>
            <AppText variant="label" className="text-black font-semibold">
              Day {day.dayNumber}
            </AppText>
            <Text className="text-sm text-gray-600">
              {formatDate(day.date)}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <Ionicons 
            name={getWeatherIcon(day.chanceOfRain)} 
            size={16} 
            color="#666" 
          />
          <Text className="text-sm text-gray-600 ml-1">
            {day.temperatureMin}°-{day.temperatureMax}°C
          </Text>
        </View>
      </View>

      {/* Weather Summary */}
      <View className="bg-gray-50 rounded-xl p-3 mb-4">
        <Text className="text-sm text-gray-700">
          {day.weatherSummary}
        </Text>
      </View>

      {/* Activities */}
      <View className="gap-3">
        {day.activities.map((activity, index) => (
          <ActivityCard 
            key={index} 
            activity={activity} 
            isLast={index === day.activities.length - 1}
          />
        ))}
      </View>
    </View>
  );
};
