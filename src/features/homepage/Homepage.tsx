import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/layouts/Header';
// import { Header } from '@/components/Header';
import {
  TravelInsights,
  QuickActionItem,
  RecentActivities,
} from './components';
import { useScrollDetector } from '@/hooks/useScrollDetector';

const Homepage = () => {
  const { scrollHandler, scrollEventThrottle } = useScrollDetector(20, 8);

  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      onScroll={scrollHandler}
      scrollEventThrottle={scrollEventThrottle}
    >
      <Header />
      <View className="flex-1 px-6 py-4 gap-10">
        <QuickActionItem />

        <TravelInsights />

        <RecentActivities />
      </View>
    </ScrollView>
  );
};

export default Homepage;
