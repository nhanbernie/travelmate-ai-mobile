import { View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

export interface ItineraryCardProps {
  itineraryId: string;
  destination: string;
  startDate: string;
  endDate: string;
  numberOfTravelers: number;
  preferences: string[];
  tripType: 'budget' | 'mid-range' | 'luxury';
  aiSummary: string;
  createdAt: string;
  onShare?: () => void;
}

const ItinerariesCard = ({
  itineraryId,
  destination,
  startDate,
  endDate,
  numberOfTravelers,
  preferences,
  tripType,
  aiSummary,
  createdAt,
  onShare,
}: ItineraryCardProps) => {
  const { colors, isDark } = useTheme();
  const { navigate } = useSafeNavigation();
  const [imageError, setImageError] = useState(false);

  const handleCardPress = () => {
    navigate(`/trips/result?id=${itineraryId}`);
  };

  // Helper functions
  const calculateDuration = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Default image for all itineraries
  const defaultImage =
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop';

  const formattedDate = `${startDate} - ${endDate}`;

  return (
    <TouchableOpacity
      onPress={handleCardPress}
      className={cn(
        'mb-8 rounded-3xl overflow-hidden shadow-lg mx-1', // Thêm mx-1 để có không gian cho shadow hiển thị
        isDark ? 'bg-gray-800' : 'bg-white'
      )}
      activeOpacity={0.8}
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
              uri: defaultImage,
            }}
            className="w-full h-48"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        )}

        {/* Info overlay at bottom-left */}
        <View className="absolute bottom-0 left-0 p-4 w-full bg-black/40">
          <AppText variant="title" weight="semibold" className="text-white">
            {destination}
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
              {calculateDuration()} days
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
              {destination}
            </AppText>
          </View>
        </View>

        <AppText
          variant="body"
          className="mt-1"
          style={{ color: colors.textPrimary }}
          numberOfLines={2}
        >
          {aiSummary}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default ItinerariesCard;
