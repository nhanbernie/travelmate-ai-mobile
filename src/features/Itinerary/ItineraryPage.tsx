import { View, Text } from 'react-native';
import React from 'react';
import SubHeader from '@/components/layouts/SubHeader';

const ItineraryPage = () => {
  return (
    <View>
      {/* <SubHeader title="Explore" />
      // With gradient */}
      {/* <SubHeader title="Popular Destinations" useGradient={true} /> */}
      <SubHeader
        showBackButton={false}
        title="Paris Trip"
        useGradient={false}
        // gradientColors={['#E95D77', '#FFAD9F']}
      />
      <Text>hello</Text>
    </View>
  );
};

export default ItineraryPage;
