import React from 'react';
import { ItineraryResultScreen } from '@/features/itinerary-result';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
import { useAppSelector } from '@/redux/hooks';
import { useTabBarContext } from '@/contexts/TabBarContext';
import { useFocusEffect } from '@react-navigation/native';
import SubHeader from '@/components/layouts/SubHeader';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

const mockItineraryData = {
  itineraryId: '6880687a523a78c25201b066',
  destination: 'Đà Nẵng',
  startDate: '2025-08-15',
  endDate: '2025-08-16',
  numberOfTravelers: 2,
  preferences: ['văn hóa', 'thức ăn'],
  tripType: 'mid-range' as const,
  aiSummary:
    'A 2-day cultural and culinary exploration of Đà Nẵng, focusing on historical sites, local cuisine, and scenic views. This mid-range itinerary balances popular attractions with opportunities to experience authentic Vietnamese culture.',
  aiSuggestions: [
    'Try Bún chả cá (fish cake noodle soup)',
    'Visit the Marble Mountains',
    'Take a cooking class to learn about Vietnamese cuisine',
  ],
  weatherSummary:
    'Expect warm and humid weather with a moderate chance of rain. Pack light clothing and an umbrella.',
  chanceOfRain: 40,
  temperatureMin: 25,
  temperatureMax: 32,
  days: [
    {
      dayNumber: 1,
      date: '2025-08-15',
      weatherSummary: 'Partly cloudy, warm and humid.',
      temperatureMin: 26,
      temperatureMax: 31,
      chanceOfRain: 30,
      activities: [
        {
          title: 'Breakfast at Bún Chả Cá 109',
          description:
            'Start the day with a local favorite: Bún Chả Cá (fish cake noodle soup).',
          location: '109 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng',
          startTime: '08:00',
          endTime: '09:00',
          category: 'dining' as const,
          estimatedCost: 50000,
          priority: 1,
          tags: ['food', 'local'],
          notes: 'Popular local spot, expect a short wait during peak hours.',
          bookingUrl: '',
          contactInfo: '',
        },
        {
          title: 'Marble Mountains Exploration',
          description:
            'Explore the caves, temples, and viewpoints of the Marble Mountains. Wear comfortable shoes for climbing.',
          location: '81 Huyền Trân Công Chúa, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng',
          startTime: '09:30',
          endTime: '12:00',
          category: 'sightseeing' as const,
          estimatedCost: 40000,
          priority: 1,
          tags: ['cultural', 'historic', 'sightseeing'],
          notes:
            'Consider hiring a local guide for a more in-depth experience.',
          bookingUrl: '',
          contactInfo: '',
        },
      ],
    },
  ],
  totalEstimatedCost: 1210000,
  createdAt: '2025-07-23T04:43:38.868Z',
  updatedAt: '2025-07-23T04:43:38.868Z',
};

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
  const currentItinerary = useAppSelector(
    (state) => state.itinerary.currentItinerary
  );

  // Use Redux data if available, otherwise fallback to mock data
  const itineraryData = currentItinerary || mockItineraryData;

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
