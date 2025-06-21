import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotesScreen() {
  return (
    <SafeAreaView>
      <View className=''>
        <Text className='text-5xl text-center text-red-200'>Test</Text>
      </View>
    </SafeAreaView>
  );
}
