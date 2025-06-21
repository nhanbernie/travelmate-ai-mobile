import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-gray-900"
      edges={['left', 'right']}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};
