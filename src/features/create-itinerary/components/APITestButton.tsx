import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCreateItinerary } from '../hooks/useCreateItinerary';

export const APITestButton: React.FC = () => {
  const { mapFormDataToAPI, formData } = useCreateItinerary();

  const testMapping = () => {
    // Test data giống như API example
    const testFormData = {
      ...formData,
      destination: 'Đà Nẵng',
      startDate: new Date('2025-08-15'),
      endDate: new Date('2025-08-16'),
      budget: 2000000,
      preferences: [
        { id: '1', name: 'Culture', icon: '🏛️', color: 'bg-pink-500', selected: true },
        { id: '2', name: 'Food', icon: '🍽️', color: 'bg-pink-500', selected: true },
        { id: '3', name: 'Adventure', icon: '🏔️', color: 'bg-pink-500', selected: false },
      ],
    };

    const apiData = mapFormDataToAPI(testFormData);
    
    console.log('=== API Mapping Test ===');
    console.log('Form Data:', testFormData);
    console.log('API Data:', apiData);
    
    Alert.alert(
      'API Mapping Test',
      JSON.stringify(apiData, null, 2),
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={testMapping}>
        <Text style={styles.buttonText}>Test API Mapping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    margin: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
