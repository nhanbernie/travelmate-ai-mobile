import ItineraryScreen from '@/features/Itinerary/ItineraryScreen';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
const Itinerary = () => {
  return (
    <ScreenWrapper
      useSafeArea={{
        top: false,
        bottom: false,
      }}
    >
      <ItineraryScreen />
    </ScreenWrapper>
  );
};

export default Itinerary;
