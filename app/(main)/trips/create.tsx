import React from 'react';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
import CreateItineraryScreen from '@/features/create-itinerary/CreateItineraryScreen';

const CreateItinerary = () => {
  return (
    <ScreenWrapper
      useSafeArea={{
        top: false,
        bottom: false,
      }}
    >
      <CreateItineraryScreen />
    </ScreenWrapper>
  );
};

export default CreateItinerary;
