import { View, Text } from 'react-native';
import { Header } from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
const Index = () => {
  return (
    <ScreenWrapper>
      <Header />
      <View className="flex-1 justify-center p-6">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Homepage
        </Text>
        <Text className="text-gray-600">Welcome! You are logged in.</Text>
      </View>
    </ScreenWrapper>
  );
};

export default Index;
