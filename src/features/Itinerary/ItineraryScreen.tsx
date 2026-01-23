import { View, ScrollView } from "react-native";
import React from "react";
import SubHeader from "@/components/layouts/SubHeader";
import ItineraryFilter from "./components/ItineraryFilter";
import HistoryItinerary from "./components/HistoryItinerary";
import { AppText } from "@/components/ui/AppText";
import { useTheme } from "@/hooks/useTheme";
import { AppButton } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { useGetMyItinerariesQuery } from "@/services/itinerary";

const ItineraryScreen = () => {
  const { colors } = useTheme();
  const { navigate } = useSafeNavigation();

  // Fetch data at screen level to control UI visibility
  const { data: response, isLoading, error } = useGetMyItinerariesQuery();
  const itineraries = response?.data || [];
  const hasData = itineraries.length > 0;

  const handleCreateItinerary = () => {
    navigate("/trips/create");
  };

  return (
    <View className="flex-1">
      {hasData && (
        <SubHeader showBackButton={false} useGradient={false}>
          <View className="flex-row justify-between items-center py-4">
            <View className="flex-1">
              <AppText variant="h2" style={{ color: colors.primaryColor }}>
                Itinerary
              </AppText>
            </View>

            <View className="flex-shrink-0">
              <AppButton
                title="Add Itinerary"
                textClassName="text-[#E95D77] text-base font-semibold"
                className="bg-[#FEE7ED] "
                onPress={handleCreateItinerary}
                endIcon={<Ionicons name="add-outline" size={24} color="#E95D77" />}
              />
            </View>
          </View>
        </SubHeader>
      )}

      <View className="flex-1">
        {hasData && (
          <View className="px-6 mb-2">
            <ItineraryFilter />
          </View>
        )}

        <View className="flex-1">
          <HistoryItinerary itineraries={itineraries} isLoading={isLoading} error={error} />
        </View>
      </View>
    </View>
  );
};

export default ItineraryScreen;
