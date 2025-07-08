import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { Header } from '@/components/Header';
import Header from '@/components/layouts/Header';
import { TravelInsights, QuickActionItem } from './components';
const Homepage = () => {
  return (
    <>
      <Header />
      <ScrollView>
        <View className="flex-1 px-6 py-4 gap-10">
          <QuickActionItem />

          <TravelInsights />
        </View>
      </ScrollView>
    </>
  );
};

export default Homepage;
