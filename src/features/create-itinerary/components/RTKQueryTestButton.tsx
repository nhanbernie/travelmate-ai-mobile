import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useGenerateItineraryMutation } from '@/services/itinerary';
import { CreateItineraryAPIRequest } from '../types';

export const RTKQueryTestButton: React.FC = () => {
  const [generateItinerary, { isLoading, error }] =
    useGenerateItineraryMutation();

  const testRTKQuery = async () => {
    const testData: CreateItineraryAPIRequest = {
      destination: 'Đà Nẵng',
      startDate: '2025-08-15',
      endDate: '2025-08-16',
      numberOfTravelers: 2,
      preferences: ['văn hóa', 'thức ăn'],
      tripType: 'mid-range',
      budget: '2000000',
    };

    try {
      console.log('🚀 Testing RTK Query with data:', testData);
      const response = await generateItinerary(testData).unwrap();

      console.log('✅ RTK Query Success:', response);
      Alert.alert(
        'RTK Query Test Success',
        `Status: ${response.statusCode}\nMessage: ${response.message}`,
        [{ text: 'OK' }]
      );
    } catch (err) {
      console.error('❌ RTK Query Error:', err);
      Alert.alert('RTK Query Test Error', JSON.stringify(err, null, 2), [
        { text: 'OK' },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={testRTKQuery}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Testing RTK Query...' : 'Test RTK Query API'}
        </Text>
      </TouchableOpacity>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {JSON.stringify(error)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e3f2fd',
    margin: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  errorContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#ffebee',
    borderRadius: 4,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
  },
});
