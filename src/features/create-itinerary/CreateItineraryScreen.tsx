import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';
import { useCreateItinerary } from './hooks/useCreateItinerary';
import { CreateItineraryProps } from './types';
import DestinationInput from './components/DestinationInput';
import DateSelector from './components/DateSelector';
import BudgetRange from './components/BudgetRange';
import TravelPreferences from './components/TravelPreferences';
import AccommodationSelector from './components/AccommodationSelector';
import TransportationSelector from './components/TransportationSelector';
import { cn } from '@/utils/cn';

const CreateItineraryScreen: React.FC<CreateItineraryProps> = ({
  onSubmit,
  onCancel,
}) => {
  const { colors } = useTheme();
  const { navigate } = useSafeNavigation();
  const {
    formData,
    errors,
    updateDestination,
    updateStartDate,
    updateEndDate,
    updateBudget,
    togglePreference,
    toggleAccommodation,
    toggleTransportation,
    validateForm,
  } = useCreateItinerary();

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/trips');
    }
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
            <DateSelector
              label="Start Date"
              value={formData.startDate}
              onDateChange={updateStartDate}
              error={errors.startDate}
              minimumDate={new Date()}
            />
            <DateSelector
              label="End Date"
              value={formData.endDate}
              onDateChange={updateEndDate}
              error={errors.endDate}
              minimumDate={formData.startDate || new Date()}
            />
          </View>

          {/* Budget Range */}
          <BudgetRange value={formData.budget} onValueChange={updateBudget} />

          {/* Travel Preferences */}
          <TravelPreferences
            preferences={formData.preferences}
            onPreferenceToggle={togglePreference}
          />

          {/* Accommodation & Transportation */}
          <AccommodationSelector
            accommodations={formData.accommodation}
            onAccommodationToggle={toggleAccommodation}
          />

          <TransportationSelector
            transportations={formData.transportation}
            onTransportationToggle={toggleTransportation}
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <View className="flex-row gap-3">
          <Pressable
            onPress={handleCancel}
            className="flex-1 py-4 px-6 rounded-xl border border-gray-300 bg-white"
          >
            <AppText
              variant="body"
              className="text-center text-gray-700 font-semibold"
            >
              Cancel
            </AppText>
          </Pressable>

          <Pressable
            onPress={handleSubmit}
            className="flex-2 py-4 px-6 rounded-xl"
            style={{ backgroundColor: colors.primaryColor }}
          >
            <AppText
              variant="body"
              className="text-center text-white font-semibold"
            >
              Create My Perfect Trip
            </AppText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CreateItineraryScreen;
