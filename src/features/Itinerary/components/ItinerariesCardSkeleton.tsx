import { View } from 'react-native';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';

const ItinerariesCardSkeleton = () => {
  const { isDark } = useTheme();

  const skeletonBgColor = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const animationClass = 'animate-pulse';

  return (
    <View className="mb-4 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
      {/* Image skeleton */}
      <View className={`w-full h-48 ${skeletonBgColor} ${animationClass}`} />

      {/* Bottom content skeleton */}
      <View className="p-4">
        {/* Duration and location row */}
        <View className="flex-row justify-between mb-3">
          <View
            className={`h-4 w-16 rounded-full ${skeletonBgColor} ${animationClass}`}
          />
          <View
            className={`h-4 w-24 rounded-full ${skeletonBgColor} ${animationClass}`}
          />
        </View>

        {/* Description lines */}
        <View
          className={`h-4 w-full rounded-full ${skeletonBgColor} ${animationClass} mb-2`}
        />
        <View
          className={`h-4 w-4/5 rounded-full ${skeletonBgColor} ${animationClass}`}
        />
      </View>
    </View>
  );
};

export default ItinerariesCardSkeleton;
