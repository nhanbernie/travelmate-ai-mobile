import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/ui/AppText';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  isLast?: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isLast }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dining':
        return 'restaurant-outline';
      case 'sightseeing':
        return 'camera-outline';
      case 'shopping':
        return 'bag-outline';
      case 'entertainment':
        return 'musical-notes-outline';
      case 'transport':
        return 'car-outline';
      default:
        return 'location-outline';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dining':
        return '#f97316';
      case 'sightseeing':
        return '#3b82f6';
      case 'shopping':
        return '#8b5cf6';
      case 'entertainment':
        return '#ec4899';
      case 'transport':
        return '#6b7280';
      default:
        return '#10b981';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5); // Remove seconds
  };

  return (
    <View className="flex-row">
      {/* Timeline */}
      <View className="items-center mr-3">
        <View 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: getCategoryColor(activity.category) }}
        />
        {!isLast && (
          <View className="w-0.5 h-16 bg-gray-200 mt-2" />
        )}
      </View>

      {/* Content */}
      <View className="flex-1">
        <TouchableOpacity className="bg-gray-50 rounded-xl p-3 mb-3">
          {/* Header */}
          <View className="flex-row items-start justify-between mb-2">
            <View className="flex-1 mr-3">
              <View className="flex-row items-center mb-1">
                <Ionicons 
                  name={getCategoryIcon(activity.category)} 
                  size={16} 
                  color={getCategoryColor(activity.category)} 
                />
                <Text className="text-xs text-gray-500 ml-1 capitalize">
                  {activity.category}
                </Text>
              </View>
              <AppText variant="body" className="text-black font-semibold">
                {activity.title}
              </AppText>
            </View>

            <View className="items-end">
              <Text className="text-xs text-gray-500">
                {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
              </Text>
              {activity.estimatedCost > 0 && (
                <Text className="text-xs font-medium text-green-600 mt-1">
                  {formatCurrency(activity.estimatedCost)}
                </Text>
              )}
            </View>
          </View>

          {/* Description */}
          <Text className="text-sm text-gray-700 mb-2 leading-5">
            {activity.description}
          </Text>

          {/* Location */}
          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text className="text-xs text-gray-600 ml-1 flex-1">
              {activity.location}
            </Text>
          </View>

          {/* Tags */}
          {activity.tags.length > 0 && (
            <View className="flex-row flex-wrap gap-1 mb-2">
              {activity.tags.slice(0, 3).map((tag, index) => (
                <View key={index} className="bg-white px-2 py-1 rounded-full">
                  <Text className="text-xs text-gray-600">
                    #{tag}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Notes */}
          {activity.notes && (
            <View className="bg-amber-50 p-2 rounded-lg mt-2">
              <View className="flex-row items-start">
                <Ionicons name="information-circle-outline" size={14} color="#f59e0b" />
                <Text className="text-xs text-amber-700 ml-1 flex-1">
                  {activity.notes}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
