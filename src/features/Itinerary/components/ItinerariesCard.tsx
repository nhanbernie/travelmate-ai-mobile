import { View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';

export interface ItineraryCardProps {
  id: string;
  title: string;
  image: string;
  startDate: string;
  endDate: string;
  duration: number;
  location: string;
  description: string;
  onShare?: () => void;
}

const ItinerariesCard = ({
  id,
  title,
  image,
  startDate,
  endDate,
  duration,
  location,
  description,
  onShare,
}: ItineraryCardProps) => {
  const { colors, isDark } = useTheme();
  const [imageError, setImageError] = useState(false);

  const formattedDate = `${startDate} - ${endDate}`;

  return (
    <View
      className={cn(
        'mb-4 rounded-xl overflow-hidden shadow-sm',
        isDark ? 'bg-gray-800' : 'bg-white'
      )}
    >
      {/* Image container with overlay info */}
      <View className="relative">
        {imageError ? (
          <View
            className={cn(
              'w-full h-48 items-center justify-center',
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            )}
          >
            <Ionicons name="image-outline" size={48} color={colors.greyColor} />
            <AppText className="mt-2" style={{ color: colors.greyColor }}>
              Image not available
            </AppText>
          </View>
        ) : (
          <Image
            source={{
              uri: image,
            }}
            className="w-full h-48"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        )}

        {/* Info overlay at bottom-left */}
        <View className="absolute bottom-0 left-0 p-4 w-full bg-black/40">
          <AppText variant="title" weight="semibold" className="text-white">
            {title}
          </AppText>
          <View className="flex-row items-center mt-1">
            <Ionicons name="time-outline" size={14} color="#FFFFFF" />
            <AppText variant="bodySmall" className="text-white ml-1">
              {formattedDate}
            </AppText>
          </View>
        </View>

        {/* Share button at top-right */}
        <TouchableOpacity
          onPress={onShare}
          className="absolute top-2 right-2 bg-white/30 rounded-full p-2"
        >
          <Ionicons name="share-social-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Bottom content */}
      <View className="p-4">
        <View className="flex-row justify-start mb-2">
          <View className="flex-row mr-4 items-center">
            <Ionicons
              name="calendar-outline"
              size={16}
              color={colors.primaryColor}
            />
            <AppText
              variant="bodySmall"
              className="ml-1"
              style={{ color: colors.greyColor }}
            >
              {duration} days
            </AppText>
          </View>
          <View className="flex-row items-center">
            <Ionicons
              name="location-outline"
              size={16}
              color={colors.primaryColor}
            />
            <AppText
              variant="bodySmall"
              className="ml-1"
              style={{ color: colors.greyColor }}
            >
              {location}
            </AppText>
          </View>
        </View>

        <AppText
          variant="body"
          className="mt-1"
          style={{ color: colors.textPrimary }}
          numberOfLines={2}
        >
          {description}
        </AppText>
      </View>
    </View>
  );
};

export default ItinerariesCard;
