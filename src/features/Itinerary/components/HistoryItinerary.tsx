import { View, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import ItinerariesCard, { ItineraryCardProps } from './ItinerariesCard';
import ItinerariesCardSkeleton from './ItinerariesCardSkeleton';
import EmptyItinerary from './EmptyItinerary';
import { mockItinerariesData } from '@/services/mock/mockItineraries';
import { useScrollDetector } from '@/hooks/useScrollDetector';

const mockItineraries: ItineraryCardProps[] = mockItinerariesData;

const HistoryItinerary = () => {
  // Use our scroll detector to control TabBar visibility
  // hideThreshold: 25px để ẩn TabBar (trong list cần kéo nhiều hơn)
  // showThreshold: 6px để hiện TabBar (phản hồi nhanh khi kéo ngược)
  const { scrollHandler, scrollEventThrottle } = useScrollDetector(25, 6);
  const [itineraries, setItineraries] = useState<ItineraryCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setItineraries(mockItineraries);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  const handleShare = (id: string) => {
    Alert.alert('Share', `Sharing itinerary ${id}`);
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
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItinerariesCard {...item} onShare={() => handleShare(item.id)} />
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
