import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
import { useScrollDetector } from '@/hooks/useScrollDetector';

const Profile = () => {
  const { scrollHandler, scrollEventThrottle } = useScrollDetector();

  return (
    <ScreenWrapper>
      <ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.description}>
          Your profile information will appear here
        </Text>

        {/* Add some extra content to make the screen scrollable for testing */}
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Text key={i} style={styles.dummyText}>
              Scroll content item {i + 1}
            </Text>
          ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dummyText: {
    fontSize: 16,
    marginVertical: 8,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default Profile;
