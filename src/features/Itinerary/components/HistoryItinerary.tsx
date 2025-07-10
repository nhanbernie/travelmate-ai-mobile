import { View, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import ItinerariesCard, { ItineraryCardProps } from './ItinerariesCard';
import ItinerariesCardSkeleton from './ItinerariesCardSkeleton';
import { AppText } from '@/components/ui/AppText';
import EmptyItinerary from './EmptyItinerary';

// Mock data for demonstration
const mockItineraries: ItineraryCardProps[] = [
  {
    id: '1',
    title: 'Adventure in the Mountains',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    startDate: 'Oct 15, 2024',
    endDate: 'Oct 22, 2024',
    duration: 7,
    location: 'Swiss Alps',
    description:
      'An unforgettable journey through breathtaking mountain landscapes and charming villages.',
  },
  {
    id: '2',
    title: 'Beach Paradise',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
    startDate: 'Nov 5, 2024',
    endDate: 'Nov 12, 2024',
    duration: 7,
    location: 'Maldives',
    description:
      'Relax and unwind on pristine white sand beaches with crystal clear turquoise waters.',
  },
  {
    id: '3',
    title: 'City Exploration',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
    startDate: 'Dec 10, 2024',
    endDate: 'Dec 15, 2024',
    duration: 5,
    location: 'Paris',
    description:
      'Discover the magic of the City of Light with its iconic landmarks and rich cultural heritage.',
  },
];

const HistoryItinerary = () => {
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
      <View className="flex-1">
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
        paddingBottom: 70,
        paddingHorizontal: 8,
      }}
    />
  );
};

export default HistoryItinerary;
