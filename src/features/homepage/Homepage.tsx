import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { Header } from '@/components/Header';
import Header from '@/components/layouts/Header';
import {
  TravelInsights,
  QuickActionItem,
  RecentActivities,
} from './components';
const Homepage = () => {
  return (
    <ScrollView>
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
