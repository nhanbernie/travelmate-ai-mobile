import React from 'react';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
import SubHeader from '@/components/layouts/SubHeader';
import CreateItineraryScreen from '@/features/create-itinerary/CreateItineraryScreen';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';
import { CreateItineraryFormData } from '@/features/create-itinerary/types';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBarContext } from '@/contexts/TabBarContext';

const CreateItinerary = () => {
  const { navigate } = useSafeNavigation();
  const { setTabBarVisible } = useTabBarContext();

  // Hide TabBar when this screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setTabBarVisible(false);

      return () => {
        setTabBarVisible(true);
      };
    }, [setTabBarVisible])
  );

  const handleSubmit = (data: CreateItineraryFormData) => {
    console.log('Create itinerary data:', data);
    // TODO: Implement API call to create itinerary
    // For now, just navigate back
    navigate('/trips');
  };

  const handleCancel = () => {
    navigate('/trips');
  };

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
      <CreateItineraryScreen onSubmit={handleSubmit} onCancel={handleCancel} />
    </ScreenWrapper>
  );
};

export default CreateItinerary;
