import ItineraryPage from '@/features/Itinerary/ItineraryPage';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
const Itinerary = () => {
  return (
    <ScreenWrapper
      useSafeArea={{
        top: false,
        bottom: false,
      }}
    >
      <ItineraryPage />
    </ScreenWrapper>
  );
};

export default Itinerary;
