import React from "react";
import { View, ScrollView, Alert } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { useCreateItinerary } from "./hooks/useCreateItinerary";
import { useGenerateItineraryMutation } from "@/services/itinerary";
import { useAppDispatch } from "@/redux/hooks";
import { setCurrentItinerary } from "@/redux/slices/itinerary.slice";
import { useTranslation } from "react-i18next";
import DestinationInput from "./components/DestinationInput";
import { DatePicker } from "@/ui/DatePicker";
import { TravelerCounterNew } from "./components/TravelerCounterNew";
import { TripTypeSelectorNew } from "./components/TripTypeSelectorNew";
import { BudgetSelectorNew } from "./components/BudgetSelectorNew";
import { PreferencesSelectorNew } from "./components/PreferencesSelectorNew";
import { AppButton } from "@/components/ui";
import { BlurView } from "expo-blur";

const CreateItineraryScreen: React.FC = () => {
  const { colors } = useTheme();
  const { navigate } = useSafeNavigation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    formData,
    errors,
    updateDestination,
    updateStartDate,
    updateEndDate,
    updateBudget,
    updateNumberOfTravelers,
    updateTripType,
    updatePreferences,
    validateForm,
  } = useCreateItinerary();

  // RTK Query mutation
  const [generateItinerary, { isLoading, error: apiError }] = useGenerateItineraryMutation();

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await generateItinerary(formData).unwrap();

        if (response.success) {
          console.log("Itinerary created successfully:", response.data);
          // Store data in Redux
          dispatch(setCurrentItinerary(response.data));
          // Navigate to result screen
          navigate("/trips/result");
        }
      } catch (error) {
        console.error("❌ Failed to create itinerary:", error);
        Alert.alert(t("itinerary.error.title"), t("itinerary.error.message"), [
          { text: t("itinerary.error.ok") },
        ]);
      }
    }
  };

  const handleCancel = () => {
    navigate("/trips");
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 py-6">
          {/* Destination Input */}
          <DestinationInput
            value={formData.destination}
            onChangeText={updateDestination}
            error={errors.destination}
          />

          {/* Date Selectors */}
          <View className="flex-row gap-4 mb-6">
            <DatePicker
              label={t("itinerary.form.startDate")}
              value={formData.startDate ? new Date(formData.startDate) : null}
              onValueChange={updateStartDate}
              error={errors.startDate}
              minimumDate={new Date()}
              containerStyle={{ flex: 1 }}
            />
            <DatePicker
              label={t("itinerary.form.endDate")}
              value={formData.endDate ? new Date(formData.endDate) : null}
              onValueChange={updateEndDate}
              error={errors.endDate}
              minimumDate={formData.startDate ? new Date(formData.startDate) : new Date()}
              containerStyle={{ flex: 1 }}
            />
          </View>

          {/* Number of Travelers */}
          <TravelerCounterNew
            value={formData.numberOfTravelers}
            onValueChange={updateNumberOfTravelers}
          />

          {/* Travel Preferences */}
          <PreferencesSelectorNew value={formData.preferences} onValueChange={updatePreferences} />

          {/* Trip Type */}
          <TripTypeSelectorNew value={formData.tripType} onValueChange={updateTripType} />

          {/* Budget */}
          <BudgetSelectorNew value={formData.budget} onValueChange={updateBudget} />
        </View>
      </ScrollView>

      {/* Button with Blur Background */}
      <BlurView
        intensity={100}
        tint="extraLight"
        className="absolute bottom-0 left-0 right-0"
        style={{
          borderTopWidth: 1,
          borderTopColor: "rgba(255, 255, 255, 0.5)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <View className="p-6" style={{ paddingBottom: 34 }}>
          <View className="flex-row gap-3">
            <AppButton
              onPress={handleCancel}
              className="flex-1 py-4 px-6 rounded-2xl border border-gray-300"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              title={t("itinerary.form.cancel")}
              textClassName="text-gray-700 font-semibold"
            />

            <AppButton
              onPress={handleSubmit}
              className="flex-2 py-4 px-6 rounded-2xl"
              style={{
                backgroundColor: colors.primaryColor,
                shadowColor: colors.primaryColor,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                elevation: 8,
              }}
              title={isLoading ? t("itinerary.form.creating") : t("itinerary.form.createButton")}
              textClassName="text-white font-semibold"
              disabled={isLoading}
              isLoading={isLoading}
            />
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default CreateItineraryScreen;
