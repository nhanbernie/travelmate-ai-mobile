import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
import SubHeader from '@/components/layouts/SubHeader';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';
import { Ionicons } from '@expo/vector-icons';

const CreateItineraryScreen = () => {
  const { colors } = useTheme();
  const { navigate } = useSafeNavigation();

  const handleGoBack = () => {
    navigate('/trips');
  };

  return (
    <ScreenWrapper
      useSafeArea={{
        top: false,
        bottom: false,
      }}
    >
      <View className="flex-1">
        <SubHeader showBackButton={true} onBackPress={handleGoBack}>
          <View className="flex-row justify-between items-center py-4">
            <View className="flex-1">
              <AppText variant="h2" style={{ color: colors.primaryColor }}>
                Create Itinerary
              </AppText>
            </View>
          </View>
        </SubHeader>

        <View className="flex-1 px-6 py-4">
          <View className="bg-white rounded-lg p-6 shadow-sm">
            <View className="items-center mb-6">
              <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                <Ionicons
                  name="map-outline"
                  size={32}
                  color={colors.primaryColor}
                />
              </View>
              <AppText variant="h3" className="text-center mb-2">
                Plan Your Journey
              </AppText>
              <AppText
                variant="bodySmall"
                className="text-center text-gray-500"
              >
                Create a detailed itinerary for your upcoming trip
              </AppText>
            </View>

            {/* Form fields would go here */}
            <View className="space-y-4">
              <View className="border border-gray-200 rounded-lg p-4">
                <AppText variant="label" className="text-gray-500 mb-1">
                  Trip Name
                </AppText>
                <Text className="text-lg">Enter your trip name...</Text>
              </View>

              <View className="border border-gray-200 rounded-lg p-4">
                <AppText variant="label" className="text-gray-500 mb-1">
                  Destination
                </AppText>
                <Text className="text-lg">Select destination...</Text>
              </View>

              <View className="border border-gray-200 rounded-lg p-4">
                <AppText variant="label" className="text-gray-500 mb-1">
                  Date Range
                </AppText>
                <Text className="text-lg">Select dates...</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.createButton,
                { backgroundColor: colors.primaryColor },
              ]}
              className="mt-6"
            >
              <AppText variant="title" className="text-white text-center">
                Create Itinerary
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  createButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default CreateItineraryScreen;
