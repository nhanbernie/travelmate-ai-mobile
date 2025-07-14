import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '@/components/ui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
const TravelInsights = () => {
  const { t } = useTranslation();

  return (
    <View className="rounded-2xl overflow-hidden shadow-lg">
      <LinearGradient
        colors={['#FEE7ED', '#FDF2F8', '#FFFFFF']}
        locations={[0, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ padding: 16 }}
      >
        <AppText variant="h4">{t('homepage.travelInsights.title')}</AppText>
        <View className="py-5">
          {/* Icon */}
          <View className="flex-row justify-around">
            {/* Items */}
            <View className="flex-col items-center justify-start gap-1">
              <View className="p-3 mb-2 bg-white rounded-full self-center">
                <Ionicons name="globe-outline" size={24} color="#E95D77" />
              </View>
              <AppText className="text-center font-bold text-[#E95D77]">
                8
              </AppText>
              <AppText className="text-center text-[#4B5563]">
                {t('homepage.travelInsights.countries')}
              </AppText>
            </View>

            <View className="flex-col items-center justify-start gap-1">
              <View className="p-3 mb-2 bg-white rounded-full self-center">
                <Ionicons name="walk-outline" size={24} color="#E95D77" />
              </View>
              <AppText className="text-center font-bold text-[#E95D77]">
                12.367
              </AppText>
              <AppText className="text-center text-[#4B5563]">
                {t('homepage.travelInsights.miles')}
              </AppText>
            </View>

            <View className="flex-col items-center justify-start gap-1">
              <View className="p-3 mb-2 bg-white rounded-full self-center">
                <Ionicons name="calendar-outline" size={24} color="#E95D77" />
              </View>
              <AppText className="text-center font-bold text-[#E95D77]">
                6
              </AppText>
              <AppText className="text-center text-[#4B5563]">
                {t('homepage.travelInsights.daysAvg')}
              </AppText>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TravelInsights;
