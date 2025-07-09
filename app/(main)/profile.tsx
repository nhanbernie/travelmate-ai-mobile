import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';

const Profile = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.description}>
          Your profile information will appear here
        </Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default Profile;
