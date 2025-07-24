import { View, FlatList, Alert } from 'react-native';
import React from 'react';
import ItinerariesCard from './ItinerariesCard';
import ItinerariesCardSkeleton from './ItinerariesCardSkeleton';
import EmptyItinerary from './EmptyItinerary';
import { useScrollDetector } from '@/hooks/useScrollDetector';
import { useGetMyItinerariesQuery } from '@/services/itinerary';

const HistoryItinerary = () => {
  const { scrollHandler, scrollEventThrottle } = useScrollDetector(25, 6);

  // RTK Query hook
  const { data: response, isLoading, error } = useGetMyItinerariesQuery();

  const itineraries = response?.data || [];
  const loading = isLoading;

  // Handle error
  if (error) {
    console.error('Error fetching itineraries:', error);
  }

  const handleShare = (itineraryId: string) => {
    Alert.alert('Share', `Sharing itinerary ${itineraryId}`);
  };

  if (loading) {
    return (
      <View className="flex-1 px-6">
        <ItinerariesCardSkeleton />
        <ItinerariesCardSkeleton />
      </View>
    );
  }

  if (itineraries.length === 0) {
    return <EmptyItinerary />;
  }

  return (
    <FlatList
      data={itineraries}
      keyExtractor={(item) => item.itineraryId}
      renderItem={({ item }) => (
        <ItinerariesCard
          {...item}
          onShare={() => handleShare(item.itineraryId)}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 16,
        paddingBottom: 100,
        paddingHorizontal: 16,
      }}
      onScroll={scrollHandler}
      scrollEventThrottle={scrollEventThrottle}
    />
  );
};

export default HistoryItinerary;
