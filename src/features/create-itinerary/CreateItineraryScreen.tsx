import React from 'react';
import { View, ScrollView } from 'react-native';
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
import { AppButton } from '@/components/ui';
import { BlurView } from 'expo-blur';

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

      {/* Button with Blur Background */}
      <BlurView
        intensity={100}
        tint="extraLight"
        className="absolute bottom-0 left-0 right-0"
        style={{
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.5)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <View className="p-6" style={{ paddingBottom: 34 }}>
          <View className="flex-row gap-3">
            <AppButton
              onPress={handleCancel}
              className="flex-1 py-4 px-6 rounded-2xl border border-gray-300"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
              title="Cancel"
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
              title="Create My Perfect Trip"
              textClassName="text-white font-semibold"
            />
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default CreateItineraryScreen;
