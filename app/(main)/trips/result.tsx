import React from 'react';
import { ItineraryResultScreen } from '@/features/itinerary-result';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
import { useAppSelector } from '@/redux/hooks';
import { useGetItineraryDetailQuery } from '@/services/itinerary';
import { useLocalSearchParams } from 'expo-router';
import { View, ActivityIndicator, Text } from 'react-native';
import { AppText } from '@/components/ui';
import { useTabBarContext } from '@/contexts/TabBarContext';
import { useFocusEffect } from '@react-navigation/native';
import SubHeader from '@/components/layouts/SubHeader';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

const ItineraryResultPage = () => {
  const { setTabBarVisible } = useTabBarContext();
  const { navigate } = useSafeNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setTabBarVisible(false);

      return () => {
        setTabBarVisible(true);
      };
    }, [setTabBarVisible])
  );

  const handleCancel = () => {
    navigate('/trips');
  };
  const { id } = useLocalSearchParams<{ id?: string }>();
  const currentItinerary = useAppSelector(
    (state) => state.itinerary.currentItinerary
  );

  // Use API detail if ID is provided, otherwise use Redux data
  const {
    data: detailResponse,
    isLoading: isDetailLoading,
    error: detailError,
  } = useGetItineraryDetailQuery(id!, {
    skip: !id, // Skip query if no ID
  });

  // Priority: API detail > Redux data > Mock data
  const itineraryData =
    detailResponse?.data || currentItinerary 
  const isLoading = isDetailLoading;

  // Show loading state
  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#E95D77" />
          <AppText className="mt-4 text-gray-600">Loading itinerary...</AppText>
        </View>
      </ScreenWrapper>
    );
  }

  // Show error state
  if (detailError) {
    return (
      <ScreenWrapper>
        <View className="flex-1 justify-center items-center p-4">
          <AppText className="text-red-600 text-center mb-4">
            Failed to load itinerary details
          </AppText>
          <Text className="text-gray-600 text-center">
            Please try again later
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      useSafeArea={{
        top: false,
        bottom: false,
      }}
    >
      <SubHeader
        showBackButton={true}
        onBackPress={handleCancel}
        title="Create Itinerary"
      />
      <ItineraryResultScreen itineraryData={itineraryData} />
    </ScreenWrapper>
  );
};

export default ItineraryResultPage;
