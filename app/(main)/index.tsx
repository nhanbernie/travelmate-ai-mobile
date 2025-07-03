import { View, Text } from 'react-native';
import { Header } from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
const Index = () => {
  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="flex-1 justify-center p-6">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Homepage
        </Text>
        <Text className="text-gray-600">Welcome! You are logged in.</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
