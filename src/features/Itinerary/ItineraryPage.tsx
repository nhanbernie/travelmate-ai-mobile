import { View } from 'react-native';
import React from 'react';
import SubHeader from '@/components/layouts/SubHeader';
import ItineraryFilter from './components/ItineraryFilter';
import HistoryItinerary from './components/HistoryItinerary';

const ItineraryPage = () => {
  return (
    <View className="flex-1">
      <SubHeader
        showBackButton={false}
        title="Paris Trip"
        useGradient={false}
      />

      <View className="flex-1 px-6">
        <ItineraryFilter />

        <View className="flex-1">
          <HistoryItinerary />
        </View>
      </View>
    </View>
  );
};

export default ItineraryPage;
